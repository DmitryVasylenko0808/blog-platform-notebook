import React from "react";
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

type CommentItemProps = {
  data: Comment;
};

const CommentItem = ({ data }: CommentItemProps) => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();

  const [triggerDeleteComment, { isLoading }] = useDeleteCommentMutation();
  const [
    triggerGetAnswers,
    { data: answersData, isLoading: isLoadingAnswers },
  ] = useLazyGetAnswersQuery();

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
    <li className="flex gap-4">
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
            <h5 className="">{`${data.author.profile.firstName} ${data.author.profile.secondName}`}</h5>
            <Link to={`/profile/${data.authorId}`}>
              <span className="">{data.author.login}</span>
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <button className="" aria-label="reply comment">
              <MdReply size={28} />
            </button>
            {isUserComment && (
              <button
                className=""
                aria-label="reply comment"
                onClick={handleDeleteComment}
                disabled={isLoading}
              >
                <FaTrash size={22} />
              </button>
            )}
          </div>
        </div>
        <div className="">
          <p className="">{data.body}</p>
          {answersData && <PostCommentsList data={answersData.comments} />}
          {isShowLoadAnswersButton ? (
            <LoadAnswersButton
              countAnswers={data._count.children}
              onLoadAnswers={handleShowAnswers}
            />
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
