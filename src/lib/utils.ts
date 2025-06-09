import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateCodeVerifier = async (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

export const generateCodeChallenge = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest(process.env.NEXT_PUBLIC_HASH_ALGORITH, data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}


export const getTopGenres = (artists: TopArtists['items']): string[] => {
  const allGenres = artists.flatMap(v => v.genres); // genres is string[]

  // Count genre occurrences
  const genreCount = allGenres.reduce<Record<string, number>>((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  // Sort allGenres (with duplicates) by frequency
  const sortedByFreq = [...allGenres].sort((a, b) => {
    return genreCount[b] - genreCount[a];
  });

  // Remove duplicates, keeping the first occurrence (which is most frequent)
  const uniqueSortedGenres = [...new Set(sortedByFreq)];

  return uniqueSortedGenres;
};
