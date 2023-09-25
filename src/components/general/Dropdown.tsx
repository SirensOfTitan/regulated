import * as browser from "app/utils/browser";
import { ReactNode } from "react";
import styles from "./Dropdown.module.css";

interface Props {
  className?: string;
  action: ReactNode;
  popup: ReactNode;
}

/** A pure CSS contextual dialog */
export default function Dropdown({ className, action, popup }: Props) {
  return (
    <div
      className={browser.classnames(styles.dropdownRoot, className)}
      tabIndex={1}
    >
      <i className={styles.closeMask} tabIndex={1} />
      <a className={browser.classnames(styles.action, "anyAction")}>{action}</a>
      <div className={styles.popup}>{popup}</div>
      <div className={styles.overlay} />
    </div>
  );
}
