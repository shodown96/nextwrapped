// import { redirect } from "next/navigation";
// import toast from "react-hot-toast";
// import { clientId, PATHS, redirectUri, scope } from "../constants";
// import { useSpotifyStore } from "../stores/spotify";
// import { generateCodeChallenge, generateCodeVerifier } from "../utils";

// export default function useSpotifyService() {
//   const {
//     setAccessToken,
//     setProfile,
//   } = useSpotifyStore()

//   const redirectToAuthCodeFlow = async () => {
//     const verifier = await generateCodeVerifier(128);
//     const challenge = await generateCodeChallenge(verifier);
//     // await navigator.clipboard.writeText(verifier)
//     // localStorage.setItem("verifier", verifier);
//     setVerifier(verifier)

//     const params = new URLSearchParams({
//       client_id: clientId,
//       response_type: "code",
//       redirect_uri: redirectUri,
//       scope,
//       code_challenge_method: "S256",
//       code_challenge: challenge,
//     });

//     window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
//     await new Promise((resolve) => setTimeout(() => resolve(true), 1000))
//   }

//   const handleAuthCallback = async (code: string) => {
//     setLoading(true);
//     try {
//       const token = await getAccessToken(code);
//       if (token) {
//         setAccessToken(token);
//       }

//       const profile = await fetchProfile(token);
//       if (profile) {
//         setProfile(profile);
//       }
//     } catch (err: any) {
//       // setError(err.message);
//       toast.error(err.message)
//     } finally {
//       setLoading(false);
//     }
//   }

//   const getAccessToken = async (code: string) => {
//     // const verifier = localStorage.getItem("verifier");
//     if (!verifier) {
//       toast.error("Verifier not found")
//       return
//     }

//     const params = new URLSearchParams({
//       client_id: clientId,
//       grant_type: "authorization_code",
//       code,
//       redirect_uri: redirectUri,
//       code_verifier: verifier,
//     });

//     const res = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: params,
//     });

//     // Clean up verifier after use
//     // localStorage.removeItem("verifier");


//     // if (!res.ok) throw new Error("Failed to get access token");
//     if (!res.ok) return null
//     const { access_token } = await res.json();
//     return access_token;
//   }

//   const fetchProfile = async (token: string): Promise<UserProfile | null> => {
//     const res = await fetch("https://api.spotify.com/v1/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // if (!res.ok) throw new Error("Failed to fetch profile");
//     if (!res.ok) return null;
//     return await res.json();
//   }

//   const fetchTopArtists = async (token: string): Promise<TopArtists | null> => {
//     const res = await fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // if (!res.ok) throw new Error("Failed to fetch top artists");
//     if (res.status === 401) redirect(PATHS.SIGN_IN)
//     if (!res.ok) return null;
//     return await res.json();
//   }

//   const fetchTopTracks = async (token: string): Promise<TopTracks | null> => {
//     const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // if (!res.ok) throw new Error("Failed to fetch top tracks");
//     if (res.status === 401) redirect(PATHS.SIGN_IN)
//     if (!res.ok) return null;
//     return await res.json();
//   }

//   return {
//     redirectToAuthCodeFlow,
//     handleAuthCallback,
//     fetchTopArtists,
//     fetchTopTracks
//   }
// }