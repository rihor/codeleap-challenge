import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TextInput } from "../TextInput";
import { Button } from "../Button";
import { TextAreaInput } from "../TextAreaInput";
import styles from "./styles.module.scss";
import { EditPostInput, postApi } from "~/services/posts";
import { useAppSelector } from "~/redux/hooks";

export const validationSchema = z.object({
  title: z.string().min(2).max(150).nonempty(),
  content: z.string().min(2).max(500).nonempty(),
});

type FormValues = z.infer<typeof validationSchema>;

interface Props {
  postId: number | null;
  onSavePost: () => void;
  onCancel: () => void;
}

export function EditPostForm(props: Props) {
  const username = useAppSelector((state) => state.user.name);
  const form = useForm<FormValues>({ resolver: zodResolver(validationSchema) });
  const mutation = useMutation({
    mutationFn: (input: EditPostInput) => postApi.editPost(props.postId, input),
    onSuccess: () => {
      props.onSavePost();
    },
  });

  const onSubmitForm: SubmitHandler<FormValues> = (values) => {
    if (username === null) {
      return;
    }

    mutation.mutate({
      title: values.title,
      content: values.content,
    });
  };

  return (
    <form className={styles.form} onSubmit={form.handleSubmit(onSubmitForm)}>
      <h2>Edit item</h2>
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

      <div className={styles.btn_group}>
        <Button
          type="button"
          className={styles.cancel}
          onClick={props.onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" className={styles.save}>
          Save
        </Button>
      </div>
    </form>
  );
}
