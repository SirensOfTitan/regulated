import { Accreditation } from "app/schemas";
import styles from "./ProductDetailsAccreditations.module.css";
import Heading from "app/components/general/Heading";

interface Props {
  accreditations: Accreditation[];
}

export default function ProductDetailsAccreditations({
  accreditations,
}: Props) {
  return (
    <article className={styles.accreditations}>
      <Heading depth={2}>Accreditations</Heading>
      {accreditations.map((a) => (
        <div className={styles.accreditation} key={a.id}>
          <a
            href={a.website ?? "#"}
            className={styles.anchor}
            aria-label={`Link to ${a.type}'s website.`}
          />
          <div className={styles.inner}>
            <h4>{a.type}</h4>
            <p>{a.description ?? "-"}</p>
          </div>
          <div className={styles.linkIcon} />
        </div>
      ))}
    </article>
  );
}
