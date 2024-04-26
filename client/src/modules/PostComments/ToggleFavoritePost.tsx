import React from "react";
import { MdFavoriteBorder } from "react-icons/md";

const ToggleFavoritePost = () => {
  return (
    <div className="py-4 flex items-center gap-2 font-bold">
      <button
        className="flex items-center gap-2 text-red-400"
        aria-label="favorite"
      >
        <MdFavoriteBorder size={24} />
      </button>
      <span>Favorite</span>
    </div>
  );
};

export default ToggleFavoritePost;
