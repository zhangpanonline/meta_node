import { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";
import Link from "next/link";

export default function UserInfo() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({data}) => {
            setUser(data.user)
        })
    }, [])

    const logout = async() => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    if (!user) return <Link href="/login" ><button className="btn btn-ghost" >登录</button></Link>

    return (
        <div>
            <span>欢迎，{user.email}</span>
            <button onClick={logout} className="btn btn-ghost">退出登录</button>
        </div>
    )
}