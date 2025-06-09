import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { ReactNode } from 'react'

interface TextLoaderProps {
    loading: boolean,
    text?: string,
    className?: string,
    children?: ReactNode,
}
function TextLoader({ loading, className = "", children, text = "Loading..." }: TextLoaderProps) {
    if (!loading) return children
    return (
        <div className={cn(
            "flex gap-2 justify-center items-center w-full py-10",
            className
        )}>
            <Loader2 className='animate-spin h-6 w-6 text-primary' />
            {text}
        </div>
    )
}

export default TextLoader