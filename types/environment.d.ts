declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: string;
    NEXT_PUBLIC_HASH_ALGORITH: string;
    NEXT_PUBLIC_MEASUREMENT_ID: string;
    NEXT_PUBLIC_URL: string;
  }
}