import { PropsWithChildren, ReactNode } from "react";
import styles from "./Tag.module.css";
import * as browser from "app/utils/browser";

interface Props extends PropsWithChildren {
  icon: ReactNode;
  background?: "primary" | "alt";
}

export default function Tag({ icon, children, background }: Props) {
  return (
    <span
      className={browser.classnames(styles.tag, {
        [styles.alt]: background === "alt",
      })}
    >
      {icon == null ? null : <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
}
