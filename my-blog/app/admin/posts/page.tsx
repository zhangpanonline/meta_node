'use client'

import { useEffect, useState, useCallback} from 'react'
import Link from 'next/link'
import { supabase } from '@/app/api/supabaseClient'
import { Database } from '@/app/api/supabaseType'
import DeleteButton from '@/app/components/DeleteButton'
import EditButton from '@/app/components/EditButton'
import { useSearchParams } from 'next/navigation'

type Article = Database['public']['Tables']['articles']['Row']

const PAGE_SIZE = 10

export default function AdminPostListPage() {
    const [posts, setPosts] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)

    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1', 10)
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const fetchPosts = useCallback(async () => {
        setLoading(true)
        const { data, count } = await supabase.from('articles').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to)
    
        if (data) {
            setPosts(data)
            setCount(count || 0)
        }
        setLoading(false)
    }, [from, to])
    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const totalPages = Math.ceil(count / PAGE_SIZE)

    return (
        <main className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🗂 所有文章</h1>
            {
                loading ? <p>加载中...</p> : (
                    <table className='table table-zebra w-full'>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>标题</th>
                                <th>Slug</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((post, idx) => (
                                    <tr key={post.id}>
                                        <td>{idx + 1}</td>
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
            
            <div className="flex justify-center mt-6 gap-2 ">
                {page > 1 && (
                        <Link href={`/admin/posts?page=${page - 1}`} className='btn btn-sm'>
                            上一页
                        </Link>
                )}
                <span className='btn btn-sm btn-ghost no-animation' >
                    第 {page} 页 / 共 {totalPages} 页
                </span>
                {page < totalPages && (
                    <Link href={`/admin/posts?page=${page + 1}`} className='btn btn-sm'>
                        下一页
                    </Link>
                )}
            </div>
        </main>
    )
}