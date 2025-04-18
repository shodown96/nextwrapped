import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { ReactNode } from 'react'

interface LoaderProps {
    loading: boolean,
    className?: string,
    children?: ReactNode,
}
function Loader({ loading, className = "", children }: LoaderProps) {
    if (!loading) return children
    return (
        <div className={cn(
            "h-screen flex justify-center items-center w-full",
            className
        )}>
            <Loader2 className='animate-spin h-16 w-16 text-primary' />
        </div>
    )
}

export default Loader