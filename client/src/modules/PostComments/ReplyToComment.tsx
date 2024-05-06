import React from "react";
import { Comment } from "../../api/posts/dto/get-comments.dto";
import { Link } from "react-router-dom";
import { AVATARS_URL, NULL_AVATAR_URL } from "../../constants/api";

type ReplyToCommentProps = {
  comment: Comment;
};

const ReplyToComment = ({ comment }: ReplyToCommentProps) => {
  const avatarImageSrc = comment?.author.profile.avatarUrl
    ? AVATARS_URL + comment.author.profile.avatarUrl
    : NULL_AVATAR_URL;

  return (
    <div className="mb-5 w-[640px] flex gap-4">
      <Link className="min-w-[50px]" to={`/profile/${comment.authorId}`}>
        <img
          className="w-[50px] h-[50px]"
          src={avatarImageSrc}
          alt="user avatar"
        />
      </Link>
      <div className="flex-auto">
        <div className="mb-4">
          <h5>{`${comment.author.profile.firstName} ${comment.author.profile.secondName}`}</h5>
          <Link to={`/profile/${comment.authorId}`}>
            <span className="">{comment.author.login}</span>
          </Link>
        </div>
        <p>{comment.body}</p>
      </div>
    </div>
  );
};

export default ReplyToComment;
