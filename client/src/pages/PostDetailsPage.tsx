import React from "react";
import { PostDetails } from "../modules/PostDetails";
import { RelatedPosts } from "../modules/RelatedPosts";

const PostDetailsPage = () => {
  return (
    <>
      <PostDetails />
      <RelatedPosts />
    </>
  );
};

export default PostDetailsPage;
