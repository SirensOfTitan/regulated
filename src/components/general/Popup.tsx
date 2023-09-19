import { PropsWithChildren } from "react";
import styles from "./Popup.module.css";

interface Props extends PropsWithChildren {}
export default function Popup({ children }: Props) {
  return <div className={styles.popup}>{children}</div>;
}
