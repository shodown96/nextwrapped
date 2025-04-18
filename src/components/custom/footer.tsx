import { PATHS } from '@/lib/constants'
import React from 'react'

export default function Footer() {
    return (
        <div className="pt-5 px-5 flex justify-center lg:justify-end">
            <div className=''>Built by{" "}
                <a
                    href={PATHS.DEVELOPER_PORTFOLIO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary">
                    Elijah Soladoye
                </a>
            </div>
        </div>
    )
}
