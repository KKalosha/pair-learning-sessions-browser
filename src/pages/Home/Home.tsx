import { useEffect, useState } from 'react'
import { fetchSessions, triggerNextError } from '@/utils/fetchSessions'
import type { Session } from '@/types/Session'
import styles from './Home.module.scss'

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSessions = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchSessions()
      setSessions(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSessions()
  }, [])

  if (loading) {
    return (
      <div role="status" aria-busy="true" className={styles.state}>
        Loading sessions...
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.state}>
        <p>Something went wrong: {error}</p>
        <button onClick={loadSessions}>Retry</button>
      </div>
    )
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Learning Sessions</h1>
        <button
          onClick={() => {
            triggerNextError()
            loadSessions()
          }}
        >
          Simulate Error
        </button>
      </header>

      <ul className={styles.list} role="list">
        {sessions.map((s) => (
          <li key={s.id} className={styles.item}>
            <strong>{s.title}</strong>
          </li>
        ))}
      </ul>
    </main>
  )
}
