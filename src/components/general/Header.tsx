import { Maybe } from "app/types";
import styles from "./Header.module.css";
import { Product } from "app/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MutableRefObject, useEffect, useRef } from "react";

interface Props {
  /** The query being typed, should not be debounced or deferred */
  query: string;
  /** Run when the text the user has typed into the query box changes */
  onChangeQuery: (newQuery: string) => void;
  /** The selected product in the set */
  product?: Maybe<Product>;
  /** Whether we should autofocus the input */
  autoFocus?: boolean;
}

export default function Header({
  query,
  onChangeQuery,
  product,
  autoFocus,
}: Props) {
  const router = useRouter();

  const inputRef = useRef(null as HTMLInputElement | null);
  useEffect(() => {
    if (autoFocus !== true) {
      return;
    }

    inputRef.current?.focus();
    // eslint-disable-next-line -- Only run on mount
  }, []);

  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        regulated.app
      </a>
      <div className={styles.query}>
        {product == null ? null : (
          <span className={styles.productToken}>
            <span className={styles.name}>{product.name}</span>
            <Link className={styles.clear} href="/">
              x
            </Link>
          </span>
        )}
        <input
          name="query"
          type="text"
          ref={inputRef}
          value={query}
          onKeyDown={(ev) => {
            if (ev.key !== "Backspace") {
              return;
            }

            router.push("/?focus=search");
          }}
          onChange={(ev) => {
            ev.preventDefault();
            onChangeQuery(ev.target.value);
          }}
        />
      </div>
    </header>
  );
}
