import React from "react";
import Title from "../../components/Title";
import { useGetPostsQuery } from "../../api/posts/postsApi";
import Post from "../../components/Post";
import SkeletonPostsList from "../../components/SkeletonPostsList";

const FeaturedPosts = () => {
  const { data, isLoading } = useGetPostsQuery({
    offset: 0,
    limit: 4,
    type: "featured",
  });

  return (
    <div>
      <Title filledText="Featured" text="This Month" />
      <div className="pr-[225px] flex flex-col gap-12 h-[480px] overflow-y-auto overflow-x-hidden scrollbar">
        {data && data.posts.map((post) => <Post data={post} key={post.id} />)}
        {isLoading && <SkeletonPostsList />}
      </div>
    </div>
  );
};

export default FeaturedPosts;
