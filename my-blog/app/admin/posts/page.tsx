'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/app/api/supabaseClient'
import { Database } from '@/app/api/supabaseType'
import DeleteButton from '@/app/components/DeleteButton'
import EditButton from '@/app/components/EditButton'

type Article = Database['public']['Tables']['articles']['Row']

export default function AdminPostListPage() {
    const [posts, setPosts] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchPosts() {
        const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false })

        if (data) setPosts(data)
        setLoading(false)
    }
    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <main className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🗂 所有文章</h1>
            {
                loading ? <p>加载中...</p> : (
                    <table className='table table-zebra w-full'>
                        <thead>
                            <tr>
                                <th>标题</th>
                                <th>Slug</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.title}</td>
                                        <td>
                                            <Link href={`/posts/${post.slug}`} className="link">{post.slug}</Link>
                                        </td>
                                        <td>{new Date(post.created_at as string).toLocaleDateString()}</td>
                                        <td className="flex gap-2" >
                                            <EditButton slug={post.slug}></EditButton>
                                            <DeleteButton slug={post.slug} onDeleted={fetchPosts}></DeleteButton>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </main>
    )
}