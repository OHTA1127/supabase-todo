import { headers, cookies } from 'next/headers'
import { format } from 'date-fns'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/database.types'
import NotFound from '@/app/blogs/[blogId]/not-found'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    todoId: string
  }
}

export default async function TodoDetailPage({ params }: PageProps) {
  //サーバーコンポーネントでsupabaseを使用するためのインスタンスを設定する
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: todo, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', params.todoId)
    .single()
  if (!todo) return notFound()
  return (
    <div>
      <p>Task ID: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Status: {todo.completed ? 'done' : 'not yet'}</p>
      <p>
        Created at:{' '}
        {todo && format(new Date(todo.created_at), 'yyyy-MM-dd HH:mm:ss')}
      </p>
    </div>
  )
}
