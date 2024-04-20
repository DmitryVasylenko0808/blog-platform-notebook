import React from "react";

import { MdOutlineWbSunny } from "react-icons/md";
import { HiOutlineMoon } from "react-icons/hi";

const ThemeSwitcher = () => {
  return (
    <div className="inline-flex justify-center items-center">
      <button
        className="w-[36px] h-[28px] bg-white text-notebook-300 rounded-l-lg inline-flex justify-center items-center"
        aria-label="sun"
      >
        <MdOutlineWbSunny size={22} />
      </button>
      <button
        className="w-[36px] h-[28px] bg-notebook-300 text-white rounded-lg inline-flex justify-center items-center"
        aria-label="moon"
      >
        <HiOutlineMoon size={22} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
