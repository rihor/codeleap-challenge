import { Post } from "~/services/posts"
import { Button } from "../Button"
import { DeleteIcon } from "../SVGs/Delete"
import { EditIcon } from "../SVGs/Edit"
import { timeFromNow } from "~/helpers/time"

import styles from "./styles.module.scss"

interface Props {
  post: Post
  username: string
}

export function Post(props: Props) {
  function onDeleteClick() {

  }

  function onEditClick() {

  }

  return (
    <article className={styles.post}>
      <header>
        <h1>{props.post.title}</h1>
        {props.username === props.post.username ? (
          <div className={styles.btn_container}>
            <Button onClick={onDeleteClick}>
              <DeleteIcon />
            </Button>

            <Button onClick={onEditClick}>
              <EditIcon />
            </Button>
          </div>
        ) : null}
      </header>

      <div className={styles.author}>
        <span>
          @{props.post.username}
        </span>
        <span>
          {timeFromNow(props.post.created_datetime)}
        </span>
      </div>

      <p className={styles.content}>{props.post.content}</p>
    </article>
  )
}