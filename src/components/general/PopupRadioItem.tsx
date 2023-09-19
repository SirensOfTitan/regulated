import { PropsWithoutRef, ReactNode, useId } from "react";
import styles from "./PopupRadioItem.module.css";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  label: ReactNode;
}
export default function PopupRadioItem({ label, ...props }: Props) {
  const id = useId();
  return (
    <div className={styles.popupItem}>
      <input {...props} id={id} type="radio" />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
