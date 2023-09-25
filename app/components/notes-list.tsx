import { Database } from '../../database.types'
import { format } from 'date-fns'

type Note = Database['public']['Tables']['notes']['Row']

async function fetchNotes() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.url}/rest/v1/notes?select=*'`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    //cache: 'no-store'は従来のSSRのような役割で、DBの変更内容が都度更新して表示される
    cache: 'no-store',
    //next: { revalidate: 10 }は従来のISRのような役割で、HTMLを再生成する秒数を指定することができる
    // next: { revalidate: 10 },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in sever')
  }
  const notes: Note[] = await res.json()
  return notes
}

export default async function NotesList() {
  const notes = await fetchNotes()
  return (
    <div>
      <p className="my-4 pb-3 text-xl font-medium underline underline-offset-4">
        Notes
      </p>
      <ul className="m-3">
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.title}</p>
            {note && format(new Date(note.created_at), 'yyyy-MM-dd HH:mm:ss')}
          </li>
        ))}
      </ul>
    </div>
  )
}
