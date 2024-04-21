import React from "react";

type ButtonProps = {
  variant: "primary" | "secondary";
  size: "big" | "small";
  children: React.ReactNode;
  onClick: React.ComponentProps<"button">["onClick"];
  isActive?: boolean;
  disabled?: boolean;
};

const Button = ({
  variant,
  size,
  children,
  disabled,
  onClick,
}: ButtonProps) => {
  const className =
    variant === "secondary"
      ? "border border-[#C4C4C4] rounded font-normal text-[#666666]"
      : "bg-notebook-300 border border-notebook-300 rounded font-normal text-white";

  const sizeClassName =
    size === "big" ? "px-[30px] py-[15px]" : "px-[26px] py-[13px]";

  const disabledClassName = disabled ? "opacity-30" : "";

  return (
    <button
      className={`flex items-center gap-2 ${className} ${sizeClassName} ${disabledClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
