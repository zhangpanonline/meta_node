'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../api/supabaseClient'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'

// 动态引入避免 SSR 报错
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })

export default function WritePage() {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [isPublished, setIsPublished] = useState(true)
    const [tags, setTags] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const {data, error} = await supabase.from('articles').insert([
            {
                title, slug, content, is_published: isPublished, tags: [tags]
            }
        ])

        setLoading(false)
        if (error) {
            alert('提交失败：' + error.message)
        } else {
            router.push(`/posts/${slug}`)
        }
    }

    return (
        <main className='max-w-2xl mx-auto p-4'>
            <h1 className="text-2xl font-bold mb-4">✍️ 写新文章</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input type="text" placeholder="文章标题" value={title} className="input input-primary input-bordered w-full" required onChange={e => setTitle(e.target.value)} />
                <input type="text" placeholder='Slug（用于 URL）' value={slug} className="input input-primary input-bordered w-full" required onChange={e => setSlug(e.target.value)} />
                <input type="text" placeholder='标签' value={tags} className="input input-primary input-bordered w-full" onChange={e => setTags(e.target.value)} />
                <div className="border border-primary rounded">
                    <MdEditor value={content} style={{ height: '500px' }} renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>} onChange={({ text }) => setContent(text)} />
                </div>
                
                <p className='flex items-center gap-4'>
                    <span className="label">是否发布</span>
                    <input type="checkbox" name="radio" className='checkbox' checked={isPublished} onChange={e => setIsPublished(e.target.checked)}></input>
                </p>
                <button type="submit" className='btn btn-primary w-full' disabled={loading}>
                    {loading ? '发布中...' : '发布文章'}
                </button>
            </form>
        </main>
    )
}