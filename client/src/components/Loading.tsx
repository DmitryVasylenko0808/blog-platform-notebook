import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-25">
      <div className="animate-spin w-20 h-20 rounded-full border-4 border-x-notebook-300 border-y-inherit" />
    </div>
  );
};

export default Loading;
