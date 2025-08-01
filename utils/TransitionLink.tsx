"use client"

import { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface TransitionLinkProps extends LinkProps {
    children: ReactNode
    href: string
    className?: string
}

const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}


const TransitionLink: React.FC<TransitionLinkProps> = ({
    children,
    href,
    className,
}) => {

    const router = useRouter();

    const handleTransition = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const body = document.querySelector("body");
        body?.classList.add("page-transition")

        await sleep(500)

        router.push(`${href}`)

        await sleep(500)

        body?.classList.remove("page-transition")
    }

    return (
        <div>
            <button onClick={handleTransition} className={`${className} cursor-pointer`}>{children}</button>
        </div >
    )
}

export default TransitionLink
