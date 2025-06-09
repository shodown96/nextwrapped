// stores/spotify.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SpotifyState {
  accessToken: string | null;
  tokenExpiry: number | null;
  profile: UserProfile | null;
  setAccessToken: (token: string, expiresIn: number) => void;
  setProfile: (profile: UserProfile) => void;
  resetStore: () => void;
}

export const useSpotifyStore = create<SpotifyState>()(
  persist(
    (set) => ({
      accessToken: null,
      tokenExpiry: null,
      profile: null,
      setAccessToken: (token, expiresIn) => {
        const expiry = Date.now() + expiresIn * 1000;
        set({ accessToken: token, tokenExpiry: expiry });
      },
      setProfile: (profile) => set({ profile }),
      resetStore: () =>
        set({ accessToken: null, tokenExpiry: null, profile: null }),
    }),
    {
      name: "spotify-storage", // 🔐 localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        tokenExpiry: state.tokenExpiry,
        profile: state.profile,
      }),
    }
  )
);
