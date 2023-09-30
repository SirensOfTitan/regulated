import { User, Product } from "app/schemas";
import { useMemo } from "react";
import * as collections from "app/utils/collections";
import * as queries from "app/queries";
import styles from "./ProductUsers.module.css";
import Image from "next/image";
import Label from "../general/Label";

interface Props {
  users: Map<string, User>;
  product: Product;
}

export default function ProductUsers({ users: usersMap, product }: Props) {
  const users = product.users;
  const usedByLogos = useMemo(
    () =>
      users
        .map((userID) => {
          const user = usersMap.get(userID);
          if (user == null) {
            return null;
          }

          const logo = queries.userSlugToImageName(user.slug);
          if (logo == null) {
            return null;
          }

          return (
            <Image
              key={user.id}
              className={styles.image}
              fill
              src={`/users/${logo}`}
              alt={`Logo for ${user.name}`}
            />
          );
        })
        .filter(collections.isNotNull)
        .slice(0, 4),
    [users, usersMap],
  );

  const remainingLogos = users.length - usedByLogos.length;

  return (
    <Label direction="column" label={"Users"} className={styles.users}>
      <div className={styles.usedContainer}>
        {usedByLogos}
        {remainingLogos <= 0 ? null : (
          <div className={styles.remaining}>+{remainingLogos}</div>
        )}
        <div className={styles.spacer} />
      </div>
    </Label>
  );
}
