import React from "react";

type TitleProps = {
  filledText: string;
  text: string;
};

const Title = ({ text, filledText }: TitleProps) => {
  return (
    <h3 className="mb-14">
      <span className="px-1 bg-notebook-300 text-white">{filledText}</span>{" "}
      {text}
    </h3>
  );
};

export default Title;
