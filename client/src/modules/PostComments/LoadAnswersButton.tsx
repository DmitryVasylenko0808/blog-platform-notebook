import React from "react";

type LoadAnswersButtonProps = {
  countAnswers: number;
  onLoadAnswers: () => void;
};

const LoadAnswersButton = ({
  countAnswers,
  onLoadAnswers,
}: LoadAnswersButtonProps) => {
  return (
    <button className="flex items-center text-sm" onClick={onLoadAnswers}>
      <span className="w-5 mr-2 border border-gray-500" />
      <span>{countAnswers} answers</span>
    </button>
  );
};

export default LoadAnswersButton;
