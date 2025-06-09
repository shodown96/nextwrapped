"use client"

import ArtistItem from "@/components/custom/artist-item";
import Card from "@/components/custom/card";
import Loader from "@/components/custom/loader";
import Logo from "@/components/custom/logo";
import Pill from "@/components/custom/pill";
import Title from "@/components/custom/title";
import TrackItem from "@/components/custom/track-item";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/constants";
import { useSpotify } from "@/lib/hooks/use-spotify";
import { useSpotifyStore } from "@/lib/stores/spotify";
import { getTopGenres } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const { profile, setProfile, accessToken } = useSpotifyStore()
  const {
    fetchProfile,
    fetchTopArtists,
    fetchTopTracks,
    resetStore,
  } = useSpotify();
  const router = useRouter()
  const [artists, setArtists] = useState<TopArtists['items'] | null>(null)
  const [tracks, setTracks] = useState<TopTracks['items'] | null>(null)
  const [topGenres, setTopGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    resetStore()
    router.replace(PATHS.SIGN_IN);
  }

  useEffect(() => {
    if (!accessToken) {
      resetStore();
      router.replace(PATHS.SIGN_IN);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true)
        const user = await fetchProfile(accessToken);
        const artists = await fetchTopArtists(accessToken);
        const tracks = await fetchTopTracks(accessToken);
        const genres = getTopGenres(artists?.items || [])
        setProfile(user);
        setArtists(artists?.items || []);
        setTracks(tracks?.items || []);
        setTopGenres(genres)
      } catch (error) {
        console.log("loadData", error)
        toast.error("Failed to load Spotify data.");
        resetStore();
        // router.replace("/sign-in");
      } finally {
        setLoading(false)
      }
    };

    loadData();
  }, []);

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = '/logo-white.png';
  // }, []);

  return (
    <Loader loading={loading}>
      <div className="p-5 max-md:pt-10">
        <Logo />
        <div className="text-xl font-semibold mb-4 max-lg:text-center">
          Welcome {profile?.display_name},
          {topGenres ? (
            <> you seem to have a thing for <span className="text-primary">#{topGenres[0]}</span> songs.</>
          ) : null}
        </div>
        <div className="grid grid-cols-12 gap-y-5 lg:gap-10 mb-10">
          {/* artists */}
          <div className="col-span-12 lg:col-span-6">
            <Card>
              <Title text="Artists" />
              {artists?.length ? (
                <>
                  {artists.map((v, i) => (
                    <ArtistItem item={v} index={i} key={v.id} />
                  ))}
                </>
              ) : null}
            </Card>
          </div>

          {/* tracks */}
          <div className="col-span-12 lg:col-span-6">
            <Card>
              <Title text="Tracks" />
              {tracks?.length ? (
                <>
                  {tracks.map((v, i) => (
                    <TrackItem item={v} index={i} key={v.id} />
                  ))}
                </>
              ) : null}
            </Card>
          </div>
        </div>

        {/* genres */}
        <Title text="Genres" />
        <div className="flex max-lg:flex-col lg:gap-10 items-center">
          <div className="flex gap-4 flex-wrap mb-4">
            {topGenres?.length ? (
              <>
                {topGenres.map(v => (
                  <Pill key={v} text={v} />
                ))}
              </>
            ) : null}
          </div>
          <div className="flex justify-center max-lg:w-full lg:justify-end mt-10">
            <Button
              variant={'spotify'}
              className="max-lg:w-full"
              loading={signingOut}
              onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
        {/* <hr className='mt-5  border-background' /> 
        <Footer /> */}
      </div>
    </Loader>
  );
}
