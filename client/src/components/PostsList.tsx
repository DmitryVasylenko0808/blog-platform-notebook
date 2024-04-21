import React from "react";
import Post from "./Post";
import { Post as PostEntity } from "../api/posts/dto/get-posts.dto";

type PostsList = {
  data: PostEntity[];
};

const PostsList = ({ data }: PostsList) => {
  return (
    <div className="flex flex-col gap-12">
      {data.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsList;
