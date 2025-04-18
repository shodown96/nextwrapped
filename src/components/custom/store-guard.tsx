"use client"
import { useSpotifyStore } from "@/lib/stores/spotify";
import { useStoreHydration } from "@/lib/hooks/store-hydration";
import { PropsWithChildren } from "react";

export function StoreGuard({ children }: PropsWithChildren) {
    const hydrate = useSpotifyStore.persist?.rehydrate;
    const alreadyHydrated = useSpotifyStore.persist?.hasHydrated();
    const { hasHydrated } = useStoreHydration({ hydrate, alreadyHydrated });

    if (!hasHydrated) return null;
    return <>{children}</>
}