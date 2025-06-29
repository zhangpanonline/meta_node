'use client'

import { useRouter } from "next/navigation"
import { supabase } from "@/app/api/supabaseClient"

export default function DeleteButton({ slug, onDeleted }: { slug: string, onDeleted?: () => void }) {
    const router = useRouter()

    const handleDelete = async () => {
        const ok = confirm('⚠️ 确认要删除这篇文章吗？删除后无法恢复！')
        if (!ok) return

        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('slug', slug)

        if (error) {
            alert('删除失败: ' + error.message)
        } else {
            alert('✅ 删除成功')
            if (onDeleted) {
                onDeleted()
            } else {
                router.push('/') // 也可以改成文章列表页地址
            }
        }
    }

    return (
        <button className="btn btn-error btn-sm btn-ghost float-right" onClick={handleDelete}>
             🗑 删除
        </button>
    )
}