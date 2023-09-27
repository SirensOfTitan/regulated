import { PropsWithChildren } from "react";
import styles from "./Container.module.css";
import * as browser from "app/utils/browser";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div className={browser.classnames(styles.container, className)}>
      {children}
    </div>
  );
}
