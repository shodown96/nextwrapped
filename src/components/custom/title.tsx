import React, { PropsWithChildren } from 'react'

export default function Title({ text }: { text: string }) {
  return (
    <h2 className='text-xl font-semibold mb-2'>{text}</h2>
  )
}
