import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
    accessToken: string | null;
    verifier: string | null;
    profile: UserProfile | null;
    isLoading: boolean;
}

interface Actions {
    setAccessToken: (accessToken: string) => void;
    setVerifier: (verifier: string) => void;
    setProfile: (profile: UserProfile) => void;
    setLoading: (loading: boolean) => void;
    reset: () => void;
}

export const useSpotifyStore = create(
    persist<State & Actions>(
        (set, get) => ({
            accessToken: null,
            verifier: null,
            profile: null,
            isLoading: false,
            setAccessToken: (accessToken) => set({ accessToken }),
            setVerifier: (verifier) => set({ verifier }),
            setProfile: (profile) => set({ profile }),
            setLoading: (loading) => set({ isLoading: loading }),
            reset: () => set({ accessToken: null, profile: null, isLoading: false }),

        }),
        {
            name: 'spotify-storage',
            skipHydration: true, // Requires the useStoreHydration usage
            storage: createJSONStorage(() => localStorage),
        }
    ))
