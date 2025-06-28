
import { supabase } from "@/app/api/supabaseClient";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import ReactMarkdown from 'react-markdown'
import EditButton from "./EditButton";

interface Props {
    params: {
        slug: string
    }
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params

    const { data, error } = await supabase.from('articles')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!data || error) return notFound()

    return (
        <main className="max-w-3xl mx-auto p-4 space-y-4">
            <h1 className="text-3xl font-bold">{ data.title }</h1>
            <p className="text-sm text-gray-500">
                发布于：{format(new Date(data.created_at as string), 'yyyy-MM-dd')}
                <EditButton slug={data.slug} ></EditButton>
            </p>
            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{data.content}</ReactMarkdown>
            </article>
        </main>
    )
}

export const revalidate = 10
// 优化渲染方式（使用 generateStaticParams 支持 SSG）
// generateStaticParams 会告诉 Next.js：编译时就为哪些 slug 生成静态页面，实现 SSG。
export async function generateStaticParams() {
    const { data } = await supabase.from('articles').select('slug')
    return (data || []).map(article => ({
        slug: article.slug
    }))
}