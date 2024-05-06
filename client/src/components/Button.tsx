import React from "react";
import { Link } from "react-router-dom";

type BaseButtonProps = {
  variant: "primary" | "secondary";
  size: "big" | "small";
  children: React.ReactNode;
};

type ButtonAsButtonProps = BaseButtonProps & {
  as?: "button";
  type?: React.ComponentProps<"button">["type"];
  disabled?: boolean;
  onClick?: React.ComponentProps<"button">["onClick"];
};

type ButtonAsLinkProps = BaseButtonProps & {
  as: "link";
  to: string;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = (props: ButtonProps) => {
  const { variant, size, children, ...rest } = props;

  const className =
    variant === "secondary"
      ? "border border-[#C4C4C4] rounded font-normal text-[#666666]"
      : "bg-notebook-300 border border-notebook-300 rounded font-normal text-white";

  const sizeClassName =
    size === "big" ? "px-[30px] py-[15px]" : "px-[26px] py-[13px]";

  if (rest.as === "link") {
    const { to } = rest;

    return (
      <Link
        className={`flex items-center gap-2 ${className} ${sizeClassName}`}
        to={to}
      >
        {children}
      </Link>
    );
  } else {
    const { type, disabled, onClick } = rest;
    const disabledClassName = disabled ? "opacity-30" : "";

    return (
      <button
        className={`flex items-center gap-2 ${className} ${sizeClassName} ${disabledClassName}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    );
  }
};

export default Button;
