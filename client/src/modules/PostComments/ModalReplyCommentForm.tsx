import React from "react";
import Modal from "../../components/Modal";
import { Comment } from "../../api/posts/dto/get-comments.dto";
import ReplyToComment from "./ReplyToComment";
import ReplyCommentForm from "./ReplyCommentForm";

type ModalReplyCommentFormProps = {
  comment: Comment;
  onClose: () => void;
};

const ModalReplyCommentForm = ({
  comment,
  onClose,
}: ModalReplyCommentFormProps) => {
  return (
    <Modal onClose={onClose}>
      <ReplyToComment comment={comment} />
      <div className="mb-5 border-2 w-full" />
      <ReplyCommentForm commentId={comment.id} />
    </Modal>
  );
};

export default ModalReplyCommentForm;
