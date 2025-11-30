import { useEffect, useMemo, useState } from "react";
import { fetchSessions, triggerNextError } from "@/utils/fetchSessions";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { Session } from "@/types/Session";
import styles from "./Home.module.scss";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryInput, setQueryInput] = useState("");
  const debouncedQuery = useDebouncedValue(queryInput, 300);

  const loadSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSessions();
      setSessions(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);


  const visibleSessions = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return sessions.filter((s) => s.title.toLowerCase().includes(q));
  }, [sessions, debouncedQuery]);

  if (loading) {
    return (
      <div role="status" aria-busy="true" className={styles.state}>
        Loading sessions...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.state}>
        <p>Something went wrong: {error}</p>
        <button onClick={loadSessions}>Retry</button>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Learning Sessions</h1>

        <div className={styles.controls}>
          <input
            type="search"
            placeholder="Search by title..."
            aria-label="Search sessions"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />

          <button
            onClick={() => {
              triggerNextError();
              loadSessions();
            }}
          >
            Simulate Error
          </button>
        </div>
      </header>

      <ul className={styles.list} role="list">
        {visibleSessions.map((s) => (
          <li key={s.id} className={styles.item}>
            <strong>{s.title}</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}
