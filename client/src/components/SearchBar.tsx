import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [value, setValue] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (inputValue: string) => {
    setValue(inputValue);
  };

  const handleSearchPosts = () => {
    if (!value) {
      return;
    }

    navigate(`/search/?value=${value}`);
  };

  return (
    <div className="flex gap-1 items-center font-semibold text-[17px]">
      <input
        className="py-0.5 px-1 bg-transparent border-b-2 border-notebook-100 outline-none focus:border-notebook-300"
        aria-label="search"
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="" aria-label="search" onClick={handleSearchPosts}>
        <MdOutlineSearch size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
