import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className={`w-[1600px] mx-auto px-[152px]`}>{children}</div>;
};

export default Container;
