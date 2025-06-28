import { supabase } from './supabaseClient'
import { Database } from './supabaseType'

// 查询文章表
export async function getArticleListApi() {
    const res = await supabase.from('articles').select()
    console.log(res)
}

// 插入文章
export async function createArticleApi(o: Database['public']['Tables']['articles']['Insert']) {
    return await supabase.from('articles').insert([
        o
    ])
}