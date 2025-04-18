export const APP_NAME = "NextWrapped"
export const APP_DESCRIPTION = "Don't wait till the end of the year to be shocked by what you've been listening to."
// https://thenextwrapped.vercel.app
export const originURL = process.env.NEXT_PUBLIC_URL;

export enum PATHS {
    LANDING = "/",
    SIGN_IN = "/sign-in",
    CALLBACK = "/callback"
}

export const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export const redirectUri = `${originURL}${PATHS.CALLBACK}`;
console.log(redirectUri)

export const scope = "user-read-private user-read-email user-top-read";