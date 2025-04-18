import React, { PropsWithChildren } from 'react'

export default function Card({children}:PropsWithChildren) {
  return (
    <div className='bg-background rounded-lg p-4'>{children}</div>
  )
}
