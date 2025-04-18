
export default function TrackItem({ item, index }: { item: TrackItem, index: number }) {
  return (
    <div className='flex gap-2 items-center'>
      <div>{index + 1}</div>
      <div className="flex gap-4 p-2">
        <img src={item.album.images?.[0].url} alt="" className="h-10 rounded bg-gray-600" />
        <div className="flex flex-col ">
          <p className="text-[16px]">{item.name}</p>
          <p className="text-sm text-gray-500">{item.artists.map(v=>v.name).join(", ")}</p>
        </div>
      </div>

    </div>
  )
}
