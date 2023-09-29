"use client";
import { useState } from "react";
import * as browser from "app/utils/browser";
import styles from "./Alert.module.css";

interface Props {
  kind: "error" | "success";
  message: string;
}

export default function Alert({ kind, message }: Props) {
  const [isDismissed, setIsDismissed] = useState(false);

  return isDismissed ? null : (
    <div
      className={browser.classnames(styles.alert, {
        [styles.error]: kind === "error",
        [styles.success]: kind === "success",
      })}
    >
      {message}
      <span className={styles.spacer} />
      {typeof window === "undefined" ? null : (
        <button
          className={styles.dismiss}
          type="button"
          aria-label="Close the dialog"
          onClick={() => setIsDismissed(true)}
        >
          x
        </button>
      )}
    </div>
  );
}
