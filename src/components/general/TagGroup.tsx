import { PropsWithChildren } from "react";
import styles from "./TagGroup.module.css";

interface Props extends PropsWithChildren {}
export default function TagGroup({ children }: Props) {
  return <div className={styles.tagGroup}>{children}</div>;
}
