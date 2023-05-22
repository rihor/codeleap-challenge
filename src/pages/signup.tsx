import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { changeUsername } from "~/redux/userSlice";
import { TextInput } from "~/components/TextInput";
import { Button } from "~/components/Button";
import styles from "./signup.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {
  const form = useForm();
  const name: string = form.watch("name");
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.name);
  const router = useRouter();

  function submit() {
    dispatch(changeUsername(name));
    router.push("/");
  }

  if (username?.length !== 0) {
    router.replace("/");
  }

  return (
    <main className={styles.page_root}>
      <form className={styles.form} onSubmit={form.handleSubmit(submit)}>
        <h1>Welcome to CodeLeap network!</h1>
        <TextInput
          label="Please enter your username"
          {...form.register("name")}
        />
        <Button
          className={styles.btn}
          disabled={name?.length === 0}
          type="submit"
        >
          Enter
        </Button>
      </form>
    </main>
  );
}
