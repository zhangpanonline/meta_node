import { supabase } from './supabaseClient'

// 查询文章表
export async function getArticleListApi() {
    const res = await supabase.from('articles').select()
    console.log(res)
}