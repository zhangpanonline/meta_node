'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../api/supabaseClient'

export default function LoginPage() {

    return (
        <main className="max-w-md mx-auto mt-20 p-4">
            <Auth
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
                theme="dark"
                providers={['github']}></Auth>
        </main>
    )
}