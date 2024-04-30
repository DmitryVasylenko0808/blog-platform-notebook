import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdReply } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { Comment } from "../../api/posts/dto/get-comments.dto";
import { useAuth } from "../../hooks/useAuth";
import {
  useDeleteCommentMutation,
  useLazyGetAnswersQuery,
} from "../../api/posts/postsApi";
import PostCommentsList from "./PostCommentsList";
import LoadAnswersButton from "./LoadAnswersButton";
import ModalReplyCommentForm from "./ModalReplyCommentForm";

type CommentItemProps = {
  data: Comment;
};

const CommentItem = ({ data }: CommentItemProps) => {
  const { id } = useParams();
  const { user } = useAuth();

  const [isOpenReplyModal, setIsOpenReplyModal] = useState<boolean>(false);

  const [triggerDeleteComment, { isLoading }] = useDeleteCommentMutation();
  const [
    triggerGetAnswers,
    { data: answersData, isLoading: isLoadingAnswers },
  ] = useLazyGetAnswersQuery();

  const handleOpenReplyModal = () => setIsOpenReplyModal(true);
  const handleCloseReplyModal = () => setIsOpenReplyModal(false);

  const handleDeleteComment = () => {
    triggerDeleteComment({
      postId: id as string,
      commentId: data.id.toString(),
    })
      .unwrap()
      .catch((err) => alert(err.data.message));
  };

  const handleShowAnswers = () => {
    if (data && id) {
      triggerGetAnswers({
        postId: id,
        commentId: data.id.toString(),
      })
        .unwrap()
        .catch((err) => alert(err.data.message));
    }
  };

  const isUserComment = data.authorId === user?.id;
  const isShowLoadAnswersButton =
    data._count.children && !answersData?.comments;

  return (
    <div className="flex gap-4">
      <Link className="min-w-[50px]" to={`/profile/${data.authorId}`}>
        <img
          className="w-[50px] h-[50px]"
          src="https://avatarfiles.alphacoders.com/114/114650.jpg"
          alt="user avatar"
        />
      </Link>
      <div className="flex-auto">
        <div className="mb-4 flex">
          <div className="flex-auto">
            <h5>{`${data.author.profile.firstName} ${data.author.profile.secondName}`}</h5>
            <Link to={`/profile/${data.authorId}`}>
              <span className="">{data.author.login}</span>
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <button aria-label="reply comment" onClick={handleOpenReplyModal}>
              <MdReply size={28} />
            </button>
            {isUserComment && (
              <button
                aria-label="reply comment"
                onClick={handleDeleteComment}
                disabled={isLoading}
              >
                <FaTrash size={22} />
              </button>
            )}
          </div>
        </div>
        <div>
          <p>{data.body}</p>
          {answersData && <PostCommentsList data={answersData.comments} />}
          {isShowLoadAnswersButton ? (
            <LoadAnswersButton
              countAnswers={data._count.children}
              onLoadAnswers={handleShowAnswers}
            />
          ) : null}
        </div>
      </div>
      {isOpenReplyModal && (
        <ModalReplyCommentForm comment={data} onClose={handleCloseReplyModal} />
      )}
    </div>
  );
};

export default CommentItem;
