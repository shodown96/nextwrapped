"use client"

import TextLoader from "@/components/custom/text-loader";
import { PATHS } from "@/lib/constants";
import { useSpotify } from "@/lib/hooks/use-spotify";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function CallbackPage() {
    const { handleAuthCallback, fetchProfile } = useSpotify();
    const searchParams = useSearchParams()
    const error = searchParams.get("error")
    const hasRun = useRef(false)
    const router = useRouter()

    useEffect(() => {
        if (hasRun.current) {
            return
        }
        hasRun.current = true
        const getCallback = async () => {
            const code = searchParams.get("code")
            if (!code) {
                toast.error("No authorization code provided");
                return;
            }
            try {
                const token = await handleAuthCallback(code);
                await fetchProfile(token);
                router.replace(PATHS.LANDING)
            } catch (error) {
                console.log(error)
                // redirect(PATHS.SIGN_IN)
            }
        }
        getCallback()
    }, [])

    useEffect(() => {
        if (error === "access_denied") {
            toast.error("Permission denied")
            redirect(PATHS.SIGN_IN)
        } else if (error) {
            toast.error("Unable to process request, please try again later.")
        }
    }, [error])

    return (
        <TextLoader loading className="h-screen" text="Authenticating with Spotify..." />
    )
}
