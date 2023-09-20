import styles from "./Header.module.css";

interface Props {
  /** The query being typed, should not be debounced or deferred */
  query: string;
  /** Run when the text the user has typed into the query box changes */
  onChangeQuery: (newQuery: string) => void;
}

export default function Header({ query, onChangeQuery }: Props) {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        regulated.app
      </a>
      <input
        className={styles.query}
        name="query"
        type="text"
        value={query}
        onChange={(ev) => {
          ev.preventDefault();
          onChangeQuery(ev.target.value);
        }}
      />
    </header>
  );
}
