import React from "react";

const SkeletonRelatedPosts = () => {
  return (
    <div className="animate-pulse flex gap-4">
      <div className="w-[422px] h-[330px] p-6 bg-skeleton rounded-md" />
      <div className="w-[422px] h-[330px] p-6 bg-skeleton rounded-md" />
      <div className="w-[422px] h-[330px] p-6 bg-skeleton rounded-md" />
    </div>
  );
};

export default SkeletonRelatedPosts;
