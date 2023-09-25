import BlogListStatic from '../components/blog-list-static'
import { RefreshuBtn } from '../components/refresh-button'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      {/* サイドバーでブログの一覧を表示している */}
      <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200 p-2`}>
        {/* @ts-ignore */}
        <BlogListStatic />
        <div className="flex justify-center">
          <RefreshuBtn />
        </div>
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  )
}
