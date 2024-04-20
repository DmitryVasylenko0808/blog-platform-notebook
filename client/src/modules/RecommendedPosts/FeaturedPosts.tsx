import React from "react";
import Title from "../../components/Title";
import PostsList from "../../components/PostsList";
import { useGetPostsQuery } from "../../api/posts/postsApi";

const FeaturedPosts = () => {
  const { data } = useGetPostsQuery({
    offset: 0,
    limit: 4,
    type: "popular",
  });

  return (
    <div>
      <Title filledText="Featured" text="This Month" />
      <PostsList data={data || []} maxHeight={480} />
    </div>
  );
};

export default FeaturedPosts;
