import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "../Button";
import { roboto } from "~/pages/_app";

interface Props {
  children: ReactNode;
}

export interface ModalHandler {
  close: () => void;
  open: () => void;
}

const ModalComponent: ForwardRefRenderFunction<ModalHandler, Props> = (
  props,
  ref
) => {
  const [isOpen, setIsOpen] = useState(false);

  // Must declare functions inside, to successfully use it outside component
  useImperativeHandle(ref, () => ({
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
  }));

  function close() {
    setIsOpen(false);
  }

  return (
    <Dialog className={roboto.variable} open={isOpen} onClose={close}>
      <div className={styles.bg} aria-hidden="true" />
      <Dialog.Panel className={styles.modal}>{props.children}</Dialog.Panel>
    </Dialog>
  );
};

export const Modal = forwardRef(ModalComponent);
