import React from "react";

const SkeletonAuthorProfile = () => {
  return (
    <div className="animate-pulse flex gap-[30px]">
      <div className="w-[526px] h-[515px] max-w-[526px] max-h-[515px] bg-skeleton" />
      <div className="flex-auto pt-[35px] pr-20">
        <div className="h-7 w-[300px] mb-7 rounded-2xl bg-skeleton" />
        <div className="h-4 w-full mb-3 rounded-xl bg-skeleton" />
        <div className="h-4 w-full mb-3 rounded-xl bg-skeleton" />
        <div className="h-4 w-full mb-3 rounded-xl bg-skeleton" />
      </div>
    </div>
  );
};

export default SkeletonAuthorProfile;
