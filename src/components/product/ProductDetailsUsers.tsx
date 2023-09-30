import * as queries from "app/queries";
import { User } from "app/schemas";
import styles from "./ProductDetailsUsers.module.css";
import Image from "next/image";

interface Props {
  users: User[];
}

export default function ProductDetailsUsers({ users }: Props) {
  return (
    <article className={styles.users}>
      {users.map((user) => (
        <div className={styles.user} key={user.id}>
          <a
            href={user.website}
            className={styles.anchor}
            aria-label={`Link to ${user.name}'s webpage`}
          />
          <div className={styles.inner}>
            <span className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={`/users/${queries.userSlugToImageName(user.slug)}`}
                fill
                alt={`Logo for ${user.name}`}
              />
            </span>
            <span className={styles.info}>
              <h4>{user.name}</h4>
            </span>
          </div>
          <div className={styles.linkIcon} />
        </div>
      ))}
    </article>
  );
}
