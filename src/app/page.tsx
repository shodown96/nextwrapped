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
import { useSpotifyStore } from "@/lib/stores/spotify";
import useSpotifyService from "@/lib/hooks/use-spotify-service";
import { getTopGenres } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { profile, accessToken, isLoading, reset } = useSpotifyStore();
  const { fetchTopArtists, fetchTopTracks } = useSpotifyService()

  const [artists, setArtists] = useState<TopArtists['items'] | null>(null)
  const [tracks, setTracks] = useState<TopTracks['items'] | null>(null)
  const [topGenres, setTopGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    reset()
  }

  useEffect(() => {
    const getTopItems = async () => {
      if (accessToken) {
        const artists = await fetchTopArtists(accessToken)
        if (artists?.items.length) {
          // console.log("artists", artists)
          setArtists(artists.items)
          const genres = getTopGenres(artists.items)
          setTopGenres(genres)
        }
        const tracks = await fetchTopTracks(accessToken)
        if (tracks?.items.length) {
          // console.log("tracks", tracks)
          setTracks(tracks.items)
        }
      }
      setLoading(false)
    }
    getTopItems()
  }, [accessToken])


  useEffect(() => {
    if (!profile) {
      redirect(PATHS.SIGN_IN)
    }
  }, [profile])

  return (
    <Loader loading={isLoading || loading}>
      <div className="p-5 max-md:pt-10">
        <Logo />
        <div className="text-xl font-semibold mb-4">
          Welcome {profile?.display_name},
          {topGenres ? (
            <> you seem to be in love with the <span className="text-primary">#{topGenres[0]}</span> genre.</>
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
        <div className="flex gap-4 flex-wrap mb-4">
          {topGenres?.length ? (
            <>
              {topGenres.map(v => (
                <Pill key={v} text={v} />
              ))}
            </>
          ) : null}
        </div>
        <div className="flex justify-end">
          <Button
            variant={'spotify'}
            className="!h-12"
            loading={signingOut}
            onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </Loader>
  );
}
