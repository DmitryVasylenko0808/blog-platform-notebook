import React from "react";
import { Category } from "../api/categories/dto/get-categories.dto";

type TagProps = {
  data: Category;
  isActive: boolean;
  onClick: React.ComponentProps<"button">["onClick"];
};

const Tag = ({ data, isActive = false, onClick }: TagProps) => {
  const className = isActive
    ? "px-5 py-2.5 bg-notebook-300 border border-notebook-300 rounded font-normal text-white"
    : "px-5 py-2.5 border border-[#C4C4C4] rounded font-normal text-[#666666]";

  return (
    <button onClick={onClick} className={className}>
      {data.title}
    </button>
  );
};

export default Tag;
