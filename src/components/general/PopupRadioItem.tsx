import { PropsWithoutRef, ReactNode, useId } from "react";
import styles from "./PopupRadioItem.module.css";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  type: "radio" | "checkbox";
  label: ReactNode;
}
export default function PopupRadioItem({ type, label, ...props }: Props) {
  const id = useId();
  return (
    <div className={styles.popupItem}>
      <input {...props} id={id} type={type} />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
