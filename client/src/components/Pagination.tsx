import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Button from "./Button";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  countSiblings: number;
  children: React.ReactNode;
  onPageClick: (pageNumber: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  countSiblings,
  children,
  onPageClick,
}: PaginationProps) => {
  let pages = Array.from({ length: totalPages }, (v, i) => i + 1);

  const baseClassName =
    "flex items-center gap-2 px-[26px] py-[13px] cursor-pointer block border rounded font-normal";
  const pageItemClassName = `${baseClassName} border-[#C4C4C4] text-[#666666]`;
  const pageItemAltenativeClassName = `${baseClassName} bg-notebook-300 border-notebook-300 text-white`;
  const pageItemActiveClassName = `${pageItemClassName} bg-[#D9D9D9]`;

  if (currentPage <= countSiblings + 1) {
    pages = pages.filter((pageNumber) => pageNumber <= countSiblings * 2 + 1);
  } else if (currentPage >= totalPages - countSiblings) {
    pages = pages.filter(
      (pageNumber) => pageNumber >= totalPages - countSiblings * 2
    );
  } else {
    pages = pages.filter(
      (pageNumber) =>
        pageNumber >= currentPage - countSiblings &&
        pageNumber <= currentPage + countSiblings
    );
  }

  if (totalPages <= 1) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <ul className="flex justify-center gap-4">
        {currentPage > 1 && (
          <li
            className={pageItemClassName}
            onClick={() => onPageClick(currentPage - 1)}
          >
            Prev.
            <GoArrowLeft size={18} />
          </li>
        )}
        {pages.map((pageNumber) => (
          <li
            className={
              pageNumber === currentPage
                ? pageItemActiveClassName
                : pageItemClassName
            }
            onClick={() => onPageClick(pageNumber)}
            key={`pageNumber ${pageNumber}`}
          >
            {pageNumber}
          </li>
        ))}
        {currentPage < totalPages && (
          <li
            className={pageItemAltenativeClassName}
            onClick={() => onPageClick(currentPage + 1)}
          >
            Next
            <GoArrowRight size={18} />
          </li>
        )}
      </ul>
    </>
  );
};

export default Pagination;
