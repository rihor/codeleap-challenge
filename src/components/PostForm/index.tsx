import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextInput } from "../TextInput";
import { Button } from "../Button";
import { TextAreaInput } from "../TextAreaInput";
import styles from "./styles.module.scss";
import { SavePostInput, postApi } from "~/services/posts";
import { useAppSelector } from "~/redux/hooks";
import { z } from "zod";

const validationSchema = z.object({
  title: z.string().min(2).max(150).nonempty(),
  content: z.string().min(2).max(500).nonempty(),
});

type FormValues = z.infer<typeof validationSchema>;

interface Props {
  onSavePost: () => void;
}

export function PostForm(props: Props) {
  const username = useAppSelector((state) => state.user.name);
  const form = useForm<FormValues>({ resolver: zodResolver(validationSchema) });
  const mutation = useMutation({
    mutationFn: (input: SavePostInput) => postApi.savePost(input),
    onSuccess: () => {
      props.onSavePost();
      mutation.reset();
    },
  });

  const onSubmitForm: SubmitHandler<FormValues> = (values) => {
    if (username === null) {
      return;
    }

    mutation.mutate({
      username,
      title: values.title,
      content: values.content,
    });
  };

  return (
    <form className={styles.form} onSubmit={form.handleSubmit(onSubmitForm)}>
      <h2>What&#x60;s on your mind?</h2>
      <TextInput
        label="Title"
        placeholder="Hello world"
        {...form.register("title")}
        validationsError={form.formState.errors}
      />
      <TextAreaInput
        label="Content"
        placeholder="Content here"
        {...form.register("content")}
        validationsError={form.formState.errors}
      />

      <Button type="submit" className={styles.custom_btn}>
        Create
      </Button>
    </form>
  );
}
