import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Button } from "../Button";
import styles from "./styles.module.scss";
import { postApi } from "~/services/posts";
import { useAppSelector } from "~/redux/hooks";

interface Props {
  postId: number | null;
  onConfirmDelete: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteForm(props: Props) {
  const username = useAppSelector((state) => state.user.name);
  const form = useForm();
  const mutation = useMutation({
    mutationFn: () => postApi.deletePost(props.postId),
    onSuccess: () => {
      props.onConfirmDelete();
    },
  });

  const onSubmitForm = () => {
    if (username === null) {
      return;
    }

    mutation.mutate();
  };

  return (
    <form className={styles.form} onSubmit={form.handleSubmit(onSubmitForm)}>
      <h2>Are you sure you want to delete this item?</h2>

      <div className={styles.btn_group}>
        <Button
          type="button"
          className={styles.cancel}
          onClick={props.onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" className={styles.delete}>
          Delete
        </Button>
      </div>
    </form>
  );
}
