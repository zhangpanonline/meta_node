import ArticleList from "./components/ArticleList";

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">博客文章列表</h1>
      <ArticleList></ArticleList>
    </main>
  )
}