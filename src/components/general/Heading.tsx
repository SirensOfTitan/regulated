import { PropsWithoutRef } from "react";
import styles from "./Heading.module.css";
import * as browser from "app/utils/browser";

type Depth = 1 | 2 | 3 | 4 | 5 | 6;
type JSXHeadings = Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;
const getHeadingElement = (depth: Depth) => {
  return `h${depth}` as keyof JSXHeadings;
};

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["h1"]> {
  depth: Depth;
}

export default function Heading({
  depth,
  className,
  children,
  ...props
}: Props) {
  const HeadingImpl = getHeadingElement(depth);
  return (
    <HeadingImpl
      {...props}
      className={browser.classnames(className, styles.heading)}
    >
      {children}
    </HeadingImpl>
  );
}
