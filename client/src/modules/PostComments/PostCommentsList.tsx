import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "../../api/posts/dto/get-comments.dto";

type PostCommentsListProps = {
  data: Comment[];
};

const PostCommentsList = ({ data }: PostCommentsListProps) => {
  return (
    <ul className="mb-0 py-4 list-none flex flex-col gap-7">
      {data.map((c) => (
        <CommentItem data={c} key={c.id} />
      ))}
    </ul>
  );
};

export default PostCommentsList;
