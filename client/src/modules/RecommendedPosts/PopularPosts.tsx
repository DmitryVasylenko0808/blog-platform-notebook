import React from "react";
import Title from "../../components/Title";
import { useGetPostsQuery } from "../../api/posts/postsApi";
import PopularPostCard from "./PopularPostCard";

const PopularPosts = () => {
  const { data } = useGetPostsQuery({
    offset: 0,
    limit: 7,
    type: "popular",
  });

  return (
    <div className="pl-12">
      <Title filledText="Populer" text="Posted"></Title>
      <div className="pr-4 flex flex-col gap-7 h-[480px] overflow-y-auto overflow-x-hidden scrollbar">
        {data &&
          data.posts.map((post) => (
            <PopularPostCard data={post} key={post.id} />
          ))}
      </div>
    </div>
  );
};

export default PopularPosts;
