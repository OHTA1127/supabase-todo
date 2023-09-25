//ブログの記事一覧を取得するためのコンポーネント

import { Database } from '@/database.types'
import Link from 'next/link'

type Blog = Database['public']['Tables']['blogs']['Row']

//データをフェッチするための非同期関数
async function fetchBlogs() {
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    //DBの内容が変更されたらその変更内容が反映されるダイナミックレンダリング
    // cache: 'no-store',
    //staticなキャッシュ
    cache: 'force-cache',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in sever')
  }
  const blogs: Blog[] = await res.json()
  return blogs
}

export default async function BlogListStatic() {
  const blogs = await fetchBlogs()
  return (
    <div className="p-4">
      <p className="mb-4 pb-3 text-xl font-medium underline underline-offset-4">
        Blogs
      </p>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`} prefetch={false}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
