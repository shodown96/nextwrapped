// https://developer.spotify.com/documentation/web-api/howtos/web-app-profile
// const clientId = "your-client-id-here"; // Replace with your client id
// const code = undefined;

// if (!code) {
//     redirectToAuthCodeFlow(clientId);
// } else {
//     const accessToken = await getAccessToken(clientId, code);
//     const profile = await fetchProfile(accessToken);
//     console.log(profile); // Profile data logs to console
//     populateUI(profile);
// }

// async function getAccessToken(clientId: string, code: string) {
//     // TODO: Get access token for code
//     const verifier = localStorage.getItem("verifier");

//     const params = new URLSearchParams();
//     params.append("client_id", clientId);
//     params.append("grant_type", "authorization_code");
//     params.append("code", code);
//     params.append("redirect_uri", "http://127.0.0.1:5173/callback");
//     params.append("code_verifier", verifier!);

//     const result = await fetch("https://accounts.spotify.com/api/token", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: params
//     });

//     const { access_token } = await result.json();
//     return access_token;
// }

// async function fetchProfile(token: string): Promise<UserProfile> {
//     // TODO: Call Web API
//     const result = await fetch("https://api.spotify.com/v1/me", {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });

//     return await result.json();
// }

// function populateUI(profile: UserProfile) {
//     // TODO: Update UI with profile data
//     document.getElementById("displayName")!.innerText = profile.display_name;
//     if (profile.images[0]) {
//         const profileImage = new Image(200, 200);
//         profileImage.src = profile.images[0].url;
//         document.getElementById("avatar")!.appendChild(profileImage);
//     }
//     document.getElementById("id")!.innerText = profile.id;
//     document.getElementById("email")!.innerText = profile.email;
//     document.getElementById("uri")!.innerText = profile.uri;
//     document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
//     document.getElementById("url")!.innerText = profile.href;
//     document.getElementById("url")!.setAttribute("href", profile.href);
//     document.getElementById("imgUrl")!.innerText = profile.images[0]?.url ?? '(no profile image)';
// }

// export async function redirectToAuthCodeFlow(clientId: string) {
//     // TODO: Redirect to Spotify authorization page
//     const verifier = generateCodeVerifier(128);
//     const challenge = await generateCodeChallenge(verifier);

//     localStorage.setItem("verifier", verifier);

//     const params = new URLSearchParams();
//     params.append("client_id", clientId);
//     params.append("response_type", "code");
//     params.append("redirect_uri", "http://127.0.0.1:5173/callback");
//     params.append("scope", "user-read-private user-read-email");
//     params.append("code_challenge_method", "S256");
//     params.append("code_challenge", challenge);

//     document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
// }

// export const generateCodeVerifier = async (length: number) => {
//     let text = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (let i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }

// export const generateCodeChallenge = async (codeVerifier: string) => {
//     const data = new TextEncoder().encode(codeVerifier);
//     const digest = await window.crypto.subtle.digest('SHA-256', data);
//     return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
//         .replace(/\+/g, '-')
//         .replace(/\//g, '_')
//         .replace(/=+$/, '');
// }

