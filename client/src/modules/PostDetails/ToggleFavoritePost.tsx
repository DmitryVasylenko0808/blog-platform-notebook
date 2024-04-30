import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

type ToggleFavoritePostProps = {
  isFavorite: boolean;
  onFavorite: () => void;
};

const ToggleFavoritePost = ({
  isFavorite,
  onFavorite,
}: ToggleFavoritePostProps) => {
  return (
    <div className="py-4 flex items-center gap-2 font-bold">
      <button
        className="flex items-center gap-2 text-red-400"
        aria-label="favorite"
        onClick={onFavorite}
      >
        {isFavorite ? <MdFavorite size={28} /> : <MdFavoriteBorder size={28} />}
      </button>
      <span>Favorite</span>
    </div>
  );
};

export default ToggleFavoritePost;
