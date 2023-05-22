import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./styles.module.scss";
import classNames from "classnames";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: ReactNode;
  href?: string;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
}

export function Button({ children, type, href, className, ...props }: Props) {
  if (href) {
    return (
      <a
        {...props}
        href={href}
        className={classNames(styles.button, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...props}
      type={type || "button"}
      className={classNames(styles.button, className)}
    >
      {children}
    </button>
  );
}
