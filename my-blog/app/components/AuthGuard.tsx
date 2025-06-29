'use client'

import { useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../api/supabaseClient"
import { UserResponse } from '@supabase/auth-js'

export default function AuthGuard({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<UserResponse['data']['user']>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
                router.push('/login')
            } else {
                setUser(data.user)
            }
            setLoading(false)
        })
    }, [router])

    if (loading) return <p className="text-center mt-20">验证中...</p>

    if (!user) return null

    return <>{children}</>
}