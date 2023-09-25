import { PropsWithChildren } from "react";
import styles from "./Popup.module.css";

interface Props extends PropsWithChildren {
  /** The title of this popup ,e.g. "Order by" */
  title: string;
}
export default function Popup({ title, children }: Props) {
  return (
    <div className={styles.popup}>
      <div className={styles.title}>
        {title}
        <span className={styles.spacer} />
        <button type="button" className={styles.close}>
          x
        </button>
      </div>
      {children}
    </div>
  );
}
