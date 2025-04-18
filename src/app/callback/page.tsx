"use client"

import Loader from "@/components/custom/loader";
import { PATHS } from "@/lib/constants";
import { useSpotifyStore } from "@/lib/stores/spotify";
import useSpotifyService from "@/lib/hooks/use-spotify-service";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CallbackPage() {
    const { handleAuthCallback } = useSpotifyService()
    const searchParams = useSearchParams()
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    const {
        profile,
    } = useSpotifyStore();

    useEffect(() => {
        const getCallback = async () => {
            if (code) {
                const toastId = toast.loading("Fetching profile")
                await handleAuthCallback(code)
                toast.dismiss(toastId)
            } else {
                redirect(PATHS.LANDING)
            }
        }
        getCallback()
    }, [code])

    useEffect(()=>{
        if(profile){
            redirect(PATHS.LANDING)
        }
    },[profile])
    useEffect(()=>{
        if(error === "access_denied"){
            toast.error("Permission denied")
            redirect(PATHS.SIGN_IN)
        } else if(error){
            toast.error("Unable to process request, please try again later.")
        }
    },[error])

    return (
        <Loader loading />
    )
}
