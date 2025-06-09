// hooks/useSpotify.ts
import { clientId, redirectUri, scope, verifier } from "@/lib/constants";
import { generateCodeChallenge } from "@/lib/utils";
import { useCallback } from "react";
import { useSpotifyStore } from "../stores/spotify";


const SPOTIFY_BASE = "https://api.spotify.com/v1";

export function useSpotify() {
    const {
        accessToken,
        tokenExpiry,
        profile,
        setAccessToken,
        setProfile,
        resetStore,
    } = useSpotifyStore();

    const redirectToAuthCodeFlow = useCallback(async () => {
        const challenge = await generateCodeChallenge(verifier);
        const params = new URLSearchParams({
            client_id: clientId,
            response_type: "code",
            redirect_uri: redirectUri,
            scope,
            code_challenge_method: "S256",
            code_challenge: challenge,
        });

        window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }, []);

    const handleAuthCallback = useCallback(async (code: string) => {
        const params = new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            code_verifier: verifier,
        });

        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
        });

        if (!res.ok) throw new Error("Failed to exchange code for token");

        const { access_token, expires_in } = await res.json();
        setAccessToken(access_token, expires_in);
        return access_token;
    }, [setAccessToken]);

    const fetchProfile = useCallback(async (token: string) => {
        if (profile) return profile;

        const res = await fetch(`${SPOTIFY_BASE}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const profileData = await res.json();
        setProfile(profileData);
        return profileData;
    }, [profile, setProfile]);

    const fetchTopItems = async (
        type: "artists" | "tracks",
        token: string,
        limit = 10
    ) => {
        const res = await fetch(`${SPOTIFY_BASE}/me/top/${type}?limit=${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Failed to fetch top ${type}`);
        return await res.json();
    };

    const fetchTopArtists = async (token: string): Promise<TopArtists | null> => {
        const res = await fetch(`${SPOTIFY_BASE}/me/top/artists?limit=10`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return null;
        return await res.json();
    };

    const fetchTopTracks = async (token: string): Promise<TopTracks | null> => {
        const res = await fetch(`${SPOTIFY_BASE}/me/top/tracks?limit=10`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return null;
        return await res.json();
    };

    const isTokenExpired = () => !tokenExpiry || Date.now() > tokenExpiry;

    return {
        getAccessToken: () => accessToken,
        redirectToAuthCodeFlow,
        handleAuthCallback,
        fetchProfile,
        fetchTopItems,
        getCachedProfile: () => profile,
        isTokenExpired,
        resetStore,
        fetchTopArtists,
        fetchTopTracks,
    };
}
