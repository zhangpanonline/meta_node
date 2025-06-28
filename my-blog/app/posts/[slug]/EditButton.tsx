'use client'
import Link from "next/link"

export default function EditButton({ slug }: { slug: string }) {
    return (
        <Link href={`/posts/${slug}/edit`} className="float-right btn btn-sm btn-ghost">✏️ 编辑</Link>
    )
}