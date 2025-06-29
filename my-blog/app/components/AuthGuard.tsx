'use client'

import { useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../api/supabaseClient"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            console.log(data, loading, 'login')
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