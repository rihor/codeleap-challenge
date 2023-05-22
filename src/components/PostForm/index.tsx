import { useForm } from "react-hook-form";

import { TextInput } from "../TextInput";
import { Button } from "../Button";
import styles from "./styles.module.scss";
import { TextAreaInput } from "../TextAreaInput";

export function PostForm() {
  const form = useForm();

  return (
    <form className={styles.form}>
      <h2>What&#x60;s on your mind?</h2>
      <TextInput
        label="Title"
        placeholder="Hello world"
        {...form.register("title")}
      />
      <TextAreaInput
        label="Content"
        placeholder="Content here"
        {...form.register("content")}
      />

      <Button className={styles.custom_btn}>Create</Button>
    </form>
  );
}
