import { useRouter } from "next/navigation";
import { useAppSelector } from "~/redux/hooks";

import { PostForm } from "~/components/PostForm";
import { Header } from "~/components/Header";
import { PostList } from "~/components/PostList";
import styles from "./index.module.scss";
import { useQuery } from "@tanstack/react-query";
import { postApi } from "~/services/posts";

export default function MainPage() {
  const username = useAppSelector((state) => state.user.name);
  const router = useRouter();
  const postsQuery = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => postApi.getPosts(),
  });

  if (username?.length === 0) {
    router.replace("/signup");
    return <>Redirecting...</>;
  }

  return (
    <main className={styles.page_root}>
      <div>
        <Header />
        <div className={styles.content}>
          <PostForm />
          {postsQuery.data ? (
            <PostList posts={postsQuery.data.results} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
}
