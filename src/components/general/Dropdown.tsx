import * as browser from "app/utils/browser";
import { ReactNode } from "react";
import styles from "./Dropdown.module.css";

interface Props {
  className?: string;
  /** The anchor element that, upon focus, will show this dropdown. */
  anchor: ReactNode;
  /** The popup that should be shown when this dropdown is focused. */
  popup: ReactNode;
}

/** A pure CSS contextual dialog */
export default function Dropdown({ className, anchor: action, popup }: Props) {
  return (
    <div className={styles.dropdownContainer}>
      <div
        className={browser.classnames(styles.dropdownRoot, className)}
        tabIndex={0}
      >
        <a className={browser.classnames(styles.action, "anyAction")}>
          {action}
        </a>
        <div className={styles.popup}>{popup}</div>
        <div className={styles.overlay} />
      </div>
      <i className={styles.closeMask} tabIndex={0} />
    </div>
  );
}
