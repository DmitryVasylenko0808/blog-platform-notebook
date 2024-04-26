import React from "react";
import { PostDetails } from "../modules/PostDetails";
import { RelatedPosts } from "../modules/RelatedPosts";
import { PostComments } from "../modules/PostComments";

const PostDetailsPage = () => {
  return (
    <>
      <PostDetails />
      <RelatedPosts />
      <PostComments />
    </>
  );
};

export default PostDetailsPage;
