import React from "react";

const SkeletonPostsList = () => {
  return (
    <div className="animate-pulse flex flex-col gap-12">
      <div className="w-[615px]">
        <div className="w-14 h-3 mb-3 rounded-xl bg-skeleton" />
        <div className="h-7 w-[500px] mb-7 rounded-3xl bg-skeleton" />
        <div className="h-3 w-80 mb-4 rounded-xl bg-skeleton" />
        <div className="h-4 w-[610px] mb-3 rounded-xl bg-skeleton" />
        <div className="h-4 w-[440px] rounded-xl bg-skeleton" />
      </div>
      <div className="w-[615px]">
        <div className="w-14 h-3 mb-3 rounded-xl bg-skeleton" />
        <div className="h-7 w-[500px] mb-7 rounded-3xl bg-skeleton" />
        <div className="h-3 w-80 mb-4 rounded-xl bg-skeleton" />
        <div className="h-4 w-[610px] mb-3 rounded-xl bg-skeleton" />
        <div className="h-4 w-[440px] rounded-xl bg-skeleton" />
      </div>
    </div>
  );
};

export default SkeletonPostsList;
