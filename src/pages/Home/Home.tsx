import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { fetchSessions, triggerNextError } from "@/utils/fetchSessions";
import type { Session } from "@/types/Session";
import styles from "./Home.module.scss";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

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

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 300),
    []
  );

  const filteredSessions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((s) => s.title.toLowerCase().includes(q));
  }, [sessions, query]);

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
            onChange={(e) => handleSearch(e.target.value)}
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
        {filteredSessions.map((s) => (
          <li key={s.id} className={styles.item}>
            <strong>{s.title}</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}
