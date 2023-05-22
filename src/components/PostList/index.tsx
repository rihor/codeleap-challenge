import { Post as PostType } from "~/services/posts";
import styles from "./styles.module.scss";
import { Post } from "./Post";
import { useAppSelector } from "~/redux/hooks";
import { useRef, useState } from "react";
import { Modal, ModalHandler } from "../Modal/Modal";
import { EditPostForm } from "../EditPostForm";
import { ConfirmDeleteForm } from "../ConfirmDeleteForm";

interface Props {
  posts: Array<PostType>;
  onEditPost: () => void;
  onDeletePost: () => void;
}

export function PostList(props: Props) {
  const username = useAppSelector((state) => state.user.name);
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);
  const editPostModalRef = useRef<ModalHandler>(null);
  const deletePostModalRef = useRef<ModalHandler>(null);

  if (username === null) {
    return <></>;
  }

  function closeModal() {
    editPostModalRef.current?.close();
    deletePostModalRef.current?.close();
  }

  function onEditedPost() {
    props.onEditPost();
    editPostModalRef.current?.close();
  }

  function onDeletePost() {
    props.onDeletePost();
    deletePostModalRef.current?.close();
  }

  function onDeletePostClicked(id: number) {
    setSelectedPostId(id);
    deletePostModalRef.current?.open();
  }

  function onEditPostClicked(id: number) {
    setSelectedPostId(id);
    editPostModalRef.current?.open();
  }

  return (
    <>
      <Modal ref={editPostModalRef}>
        <EditPostForm
          postId={selectedPostId}
          onSavePost={onEditedPost}
          onCancel={closeModal}
        />
      </Modal>
      <Modal ref={deletePostModalRef}>
        <ConfirmDeleteForm
          postId={selectedPostId}
          onConfirmDelete={onDeletePost}
          onCancel={closeModal}
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
              onDeleteClick={onDeletePostClicked}
            />
          ))}
      </ul>
    </>
  );
}
