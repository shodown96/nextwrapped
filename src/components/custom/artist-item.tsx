
export default function ArtistItem({ item, index }: { item: ArtistItem, index: number }) {
  return (
    <div className='flex gap-2 items-center'>
      <div>{index + 1}</div>
      <div className="flex gap-4 p-2">
        <img src={item.images?.[0].url} alt="" className="h-10 rounded bg-gray-600" />
        <div className="flex flex-col ">
          <p className="text-[16px]">{item.name}</p>
          <p className="text-sm text-gray-500">{item.genres?.[0]}</p>
        </div>
      </div>

    </div>
  )
}
