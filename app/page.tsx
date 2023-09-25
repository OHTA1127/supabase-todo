import NotesList from './components/notes-list'
import TimerCounter from './components/timer-counter'
import { Suspense } from 'react'
import Spinner from './components/spinner'
import { RefreshuBtn } from './components/refresh-button'

export default function Home() {
  return (
    <main>
      <div className="m-10 text-center">
        <p>Hello World!!</p>
        {/* 表示に時間のかかるNotesListをSuspenseで囲うことでTimerなどすぐに表示できるものは先に表示することができる */}
        <Suspense fallback={<Spinner color="border-green-500" />}>
          <NotesList />
        </Suspense>
        <TimerCounter />
        <RefreshuBtn />
      </div>
    </main>
  )
}
