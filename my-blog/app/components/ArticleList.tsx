'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { format } from 'date-fns'

import { Database } from '../api/supabaseType'

const fetcher = (url: string) => fetch(url).then(r => r.json())

type Article = Partial<Database['public']['Tables']['articles']['Row']>

export default function ArticleList() {
    const { data, error, isLoading } = useSWR<Article[]>('/api/articles', fetcher)
    
    if (isLoading) return <p>加载中...</p>
    if (error) return <p className="text-error" >加载失败：{error.message}</p>
    // @ts-expect-error: 请求不到数据会报错
    if (data && Object.hasOwn(data, 'error')) return <p>{data.error}</p>
    if (!data || data.length === 0) return <p>暂无文章</p>
    
    return (
        <div className="space-y-4" >
            {
                data.map(article => (
                    <div key={article.id} className='card bg-base-100 shadow-md hover:shadow-xl transition-all' >
                        <div className="card-body">
                            <h2 className="card-title text-lg font-semibold hover:underline">
                                <Link href={`/posts/${article.slug}`}>{article.title}</Link>
                            </h2>
                            <p className='text-sm text-gray-500' >
                                发布于：{format(new Date(article.created_at as string), 'yyyy-MM-dd')}
                            </p>
                            <p className='line-clamp-2' >{ article.content }</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}