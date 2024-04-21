import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Button from "./Button";

type PaginationProps = {
  currentPage: number;
  children: React.ReactNode;
  onPrevClick: React.ComponentProps<"button">["onClick"];
  onNextClick: React.ComponentProps<"button">["onClick"];
};

const Pagination = ({
  currentPage,
  children,
  onPrevClick,
  onNextClick,
}: PaginationProps) => {
  return (
    <div>
      {children}
      <div className="flex justify-center gap-4">
        {currentPage > 1 && (
          <Button variant="secondary" size="small" onClick={onPrevClick}>
            <GoArrowLeft />
            Prev.
          </Button>
        )}
        <Button variant="primary" size="small" onClick={onNextClick}>
          Next
          <GoArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
