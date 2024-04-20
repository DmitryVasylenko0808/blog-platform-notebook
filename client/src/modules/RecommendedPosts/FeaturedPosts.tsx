import React from "react";
import Title from "../../components/Title";
import { useGetPostsQuery } from "../../api/posts/postsApi";
import Post from "../../components/Post";

const FeaturedPosts = () => {
  const { data } = useGetPostsQuery({
    offset: 0,
    limit: 4,
    type: "popular",
  });

  return (
    <div>
      <Title filledText="Featured" text="This Month" />
      <div className="pr-[225px] flex flex-col gap-12 h-[480px] overflow-y-auto overflow-x-hidden">
        {data && data.map((post) => <Post data={post} />)}
      </div>
    </div>
  );
};

export default FeaturedPosts;
