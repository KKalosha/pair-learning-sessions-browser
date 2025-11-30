import clsx from "clsx";
import type { Session } from "@/types/Session";
import styles from "./SessionCard.module.scss";

interface Props {
  session: Session;
  query?: string;
  onToggle: (id: string) => void;
}

export function SessionCard({ session, query = "", onToggle }: Props) {
  const { id, title, tags, mins, difficulty, popularity, completed } = session;

  const handleToggle = () => onToggle(id);

  return (
    <li
      className={clsx(styles.card, { [styles.completed]: completed })}
      role="listitem"
    >
      <div className={styles.header}>
        <strong>{highlightMatch(title, query)}</strong>
        <button
          type="button"
          aria-pressed={completed}
          onClick={handleToggle}
          className={styles.toggle}
        >
          {completed ? "Completed" : "Mark complete"}
        </button>
      </div>

      <div>Tags: {tags.length ? tags.join(", ") : "-"}</div>
      <div>Mins: {Number(mins)}</div>
      <div>
        Difficulty:{" "}
        {difficulty ? (
          <span className={clsx(styles.badge, styles[difficulty])}>
            {difficulty}
          </span>
        ) : (
          "N/A"
        )}
      </div>
      <div>Popularity: {popularity}</div>
    </li>
  );
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className={styles.highlight}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}
