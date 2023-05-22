import { Post as PostType } from "~/services/posts";
import styles from "./styles.module.scss";
import { Post } from "./Post";
import { useAppSelector } from "~/redux/hooks";
import { useRef, useState } from "react";
import { Modal, ModalHandler } from "../Modal/Modal";
import { EditPostForm } from "../EditPostForm";

interface Props {
  posts: Array<PostType>;
  onEditPost: () => void;
}

export function PostList(props: Props) {
  const username = useAppSelector((state) => state.user.name);
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);
  const modalRef = useRef<ModalHandler>(null);

  if (username === null) {
    return <></>;
  }

  function closeModal() {
    modalRef.current?.close();
  }

  function onEditedPost() {
    props.onEditPost();
    modalRef.current?.close();
  }

  function onEditPostClicked(id: number) {
    setSelectedPostId(id);

    modalRef.current?.open();
  }

  return (
    <>
      <Modal ref={modalRef}>
        <EditPostForm
          postId={selectedPostId}
          onSavePost={onEditedPost}
          onCancelEdit={closeModal}
        />
      </Modal>
      <ul className={styles.list}>
        {props.posts?.length > 0 &&
          props.posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              username={username}
              onEditClick={onEditPostClicked}
            />
          ))}
      </ul>
    </>
  );
}
