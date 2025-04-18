"use client"
import Logo from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import useSpotifyService from "@/lib/hooks/use-spotify-service";
import { useState } from "react";

export default function SignInPage() {
    const [loading, setLoading] = useState(false)
    const { redirectToAuthCodeFlow } = useSpotifyService()

    const handleSignIn = async () => {
        setLoading(true)
        await redirectToAuthCodeFlow()
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen p-5">
            <Logo size={'lg'}/>
            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold max-w-[300px] md:max-w-[400px] lg:max-w-[600px] text-center">
                {APP_DESCRIPTION}
            </h4>
            <Button
                loading={loading}
                onClick={handleSignIn}
                variant={"spotify"}
                className="cursor-pointer">
                Sign in
            </Button>
        </div>
    )
}
