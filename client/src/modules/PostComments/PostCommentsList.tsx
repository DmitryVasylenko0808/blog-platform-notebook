import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "../../api/posts/dto/get-comments.dto";

type PostCommentsListProps = {
  data: Comment[];
};

const PostCommentsList = ({ data }: PostCommentsListProps) => {
  if (!data.length) {
    return (
      <div className="w-full py-4 flex justify-center items-center">
        No comments. Be first to comment this post
      </div>
    );
  }

  return (
    <div className="mb-0 py-4 flex flex-col gap-7">
      {data.map((c) => (
        <CommentItem data={c} key={c.id} />
      ))}
    </div>
  );
};

export default PostCommentsList;
