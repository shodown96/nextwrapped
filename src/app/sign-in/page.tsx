"use client"
import Logo from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { APP_DESCRIPTION, PATHS } from "@/lib/constants";
import { useSpotify } from "@/lib/hooks/use-spotify";
import { CheckedState } from "@radix-ui/react-checkbox";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState<CheckedState>(false)
    const { getAccessToken, getCachedProfile, redirectToAuthCodeFlow } = useSpotify();

    useEffect(() => {
        const token = getAccessToken();
        const profile = getCachedProfile();
        if (token && profile) redirect(PATHS.LANDING);
    }, []);

    const handleSignIn = async () => {
        if (!checked) {
            toast.error("Please review and accept our Terms and Privacy Policy to continue.")
            return
        }
        try {
            setLoading(true)
            await redirectToAuthCodeFlow()
            // setLoading(false) 
        } catch (error) {
            toast.error("Failed to redirect to Spotify");
        }
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen p-5">
            <Logo size={'lg'} />
            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold max-w-[300px] md:max-w-[400px] lg:max-w-[600px] text-center">
                {APP_DESCRIPTION}
            </h4>
            <p className="text-sm flex items-center gap-2">
                <span>Please review and accept our {" "}
                    <a className="text-primary underline" href={PATHS.EULA} target="_blank" rel="noopener noreferrer">Terms and Privacy Policy</a>
                    {" "} to continue.</span>
                <Checkbox
                    checked={checked}
                    onCheckedChange={v => setChecked(v)} />
            </p>
            <Button
                loading={loading}
                onClick={handleSignIn}
                disabled={!checked}
                variant={"spotify"}>
                Sign in
            </Button>
            {/* <div className="absolute bottom-5 left-0 w-full">
                <Footer/>
            </div> */}
        </div>
    )
}
