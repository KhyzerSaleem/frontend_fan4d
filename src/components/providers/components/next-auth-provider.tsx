"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'



type NextAuthProviderProps = {
    children: React.ReactNode
}

const NextAuthProvider = ({ children }: NextAuthProviderProps) => {


    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default NextAuthProvider