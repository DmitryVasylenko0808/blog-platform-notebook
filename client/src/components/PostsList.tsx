import React from "react";
import Post from "./Post";
import { Post as PostEntity } from "../api/posts/dto/get-posts.dto";

type PostsList = {
  data: PostEntity[];
  maxHeight?: number;
};

const PostsList = ({ data, maxHeight }: PostsList) => {
  const maxHeightClassName =
    maxHeight && `h-[${maxHeight}px] overflow-y-auto overflow-x-hidden`;

  return (
    <div className={`pr-[267px] flex flex-col gap-12 ${maxHeightClassName}`}>
      {data.map((post) => (
        <Post data={post} />
      ))}
    </div>
  );
};

export default PostsList;
