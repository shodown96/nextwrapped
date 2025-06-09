
export default function TrackItem({ item, index }: { item: TrackItem, index: number }) {
  return (
    <div className='flex gap-2 items-center'>
      <div>{index + 1}</div>
      <div className="flex gap-4 p-2">
        <img src={item.album.images?.[0].url} alt="" className="h-10 w-10 object-cover rounded bg-gray-600" />
        <div className="flex flex-col ">
          <p className="text-[16px] hover:underline">
            <a href={item.external_urls.spotify} target="_blank" rel="noopener noreferrer">{item.name}</a>
          </p>
          <p className="text-sm text-secondary hover:underline">
            <a href={item.artists?.[0].external_urls.spotify} target="_blank" rel="noopener noreferrer">{item.artists.map(v => v.name).join(", ")}</a>
          </p>
        </div>
      </div>

    </div>
  )
}
