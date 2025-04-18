import { APP_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import React from 'react'

export default function Logo({ size = 'default' }: { size?: 'default' | 'lg' }) {
    return (
        <div className={cn(
            'flex gap-2 items-center py-2 max-md:justify-center',
            size === 'lg' ? '' : ' mb-5'
        )}>
            <img
                alt=""
                src="/logo-white.png"
                className={size === 'lg' ? 'h-16 lg:h-20' : "h-14"} />
            <div className={cn(
                'font-semibold',
                size === 'lg' ? 'text-4xl md:text-6xl' : "text-2xl"
            )}>
                {APP_NAME}
            </div>
        </div>
    )
}
