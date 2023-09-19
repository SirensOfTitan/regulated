import * as browser from "app/utils/browser";
import styles from "./Label.module.css";
import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  direction: "row" | "column";
  label: ReactNode;
}

export default function Label({
  className,
  direction,
  label,
  children,
}: Props) {
  return (
    <article
      className={browser.classnames(className, styles.labelRoot, {
        [styles.row]: direction === "row",
        [styles.column]: direction === "column",
      })}
    >
      <div className={styles.label}>{label}</div>
      <div className={styles.body}>{children}</div>
    </article>
  );
}
