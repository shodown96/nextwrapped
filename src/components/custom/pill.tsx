
export default function Pill({ text }: { text: string }) {
  return (
    <span className='bg-primary rounded-full px-3 py-1 text-black text-sm font-medium'>
      {text}
    </span>
  )
}
