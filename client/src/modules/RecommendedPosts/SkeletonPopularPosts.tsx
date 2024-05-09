import React from "react";

const SkeletonPopularPosts = () => {
  return (
    <div className="animate-pulse flex flex-col gap-7">
      <div className="w-[360px] h-40 bg-skeleton rounded-md" />
      <div className="w-[360px] h-40 bg-skeleton rounded-md" />
    </div>
  );
};

export default SkeletonPopularPosts;
