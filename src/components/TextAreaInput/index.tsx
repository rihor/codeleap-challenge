import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import styles from "./styles.module.scss";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  validationsError?: FieldErrors<FieldValues>;
}

const InputComponent: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  { label, iconLeft, iconRight, validationsError, ...props },
  ref
) => {
  const messageError = props.name && validationsError?.[props.name]?.message;

  return (
    <div className={styles.wrapper_base}>
      {label && <label>{label}</label>}
      <div className={styles.input_wrapper}>
        {iconLeft}
        <textarea ref={ref} {...props} />
        {iconRight}
      </div>
      {messageError && (
        <span className={styles.error_message}>{messageError.toString()}</span>
      )}
    </div>
  );
};

export const TextAreaInput = forwardRef(InputComponent);
