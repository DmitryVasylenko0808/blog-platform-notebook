import React, { forwardRef } from "react";

type TextFieldProps = {
  name: React.ComponentProps<"input">["name"];
  type?: React.ComponentProps<"input">["type"];
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  onChange: React.ComponentProps<"input">["onChange"];
  onBlur: React.ComponentProps<"input">["onBlur"];
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ error, ...inputProps }, ref) => {
    return (
      <div className="w-full">
        <input
          {...inputProps}
          ref={ref}
          className="block w-full mb-2 p-[15px] outline-0 border border-notebook-250 rounded font-normal text-[15px]"
        />
        <p className="mb-0 text-sm text-red-400">{error}</p>
      </div>
    );
  }
);

export default TextField;
