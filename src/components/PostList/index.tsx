import { Post as PostType } from "~/services/posts"
import styles from "./styles.module.scss"
import { Post } from "./Post"
import { useAppSelector } from "~/redux/hooks"

interface Props {
  posts: Array<PostType>
}

export function PostList(props: Props) {
  const username = useAppSelector(state => state.user.name)

  if (username === null) {
    return <></>
  }

  return (
    <ul className={styles.list}>
      {props.posts?.length > 0 && props.posts.map(post => (
        <Post key={post.id} post={post} username={username} />
      ))}
    </ul>
  )
}