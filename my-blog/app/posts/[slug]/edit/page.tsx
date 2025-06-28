'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/app/api/supabaseClient"
import dynamic from "next/dynamic"
import Markdown from "react-markdown"

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })

export default function EditPostPage() {
    const { slug } = useParams()
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('slug', slug as string)
                .single()
            
            if (data) {
                setTitle(data.title)
                setContent(data.content)
            } else {
                alert('文章加载失败')
            }

            setLoading(false)
        }

        if (slug) fetchData()
    }, [slug])

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault()

        const { error } = await supabase
            .from('articles')
            .update({ title, content })
            .eq('slug', slug as string)

        if (error) {
            alert('更新失败：' + error.message)
        } else {
            router.push(`/posts/${slug}`)
        }
    }

    return (
        <main className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">🛠 编辑文章</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input input-primary" required />

                {/* <textarea value={content} onChange={e => setContent(e.target.value)} className="textarea textarea-primary w-full h-60" required /> */}
                <div className="border border-primary rounded">
                    <MdEditor className="h-100" value={content} renderHTML={text => <Markdown>{text}</Markdown>} onChange={({ text }) => setContent(text)}></MdEditor>
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    保存修改
                </button>
            </form>
        </main>
    )
}