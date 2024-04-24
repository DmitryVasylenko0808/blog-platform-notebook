import React, { forwardRef } from "react";

type TextAreaProps = {
  name: React.ComponentProps<"textarea">["name"];
  rows: React.ComponentProps<"textarea">["rows"];
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  onChange: React.ComponentProps<"textarea">["onChange"];
  onBlur: React.ComponentProps<"textarea">["onBlur"];
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, rows, ...textAreaProps }, ref) => {
    return (
      <div className="w-full">
        <textarea
          {...textAreaProps}
          ref={ref}
          rows={rows}
          className="resize-none block w-full mb-2 p-[15px] outline-0 border border-notebook-250 rounded font-normal text-[15px]"
        />
        <p className="mb-0 text-sm text-red-400">{error}</p>
      </div>
    );
  }
);

export default TextArea;
