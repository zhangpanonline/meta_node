import { supabase } from "../supabaseClient";
// import { Database } from "../supabaseType";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, content, created_at')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }

    return NextResponse.json(data)
}