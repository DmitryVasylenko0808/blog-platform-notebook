import React, { forwardRef, useState } from "react";
import { ImFilePicture } from "react-icons/im";

type ImageFileSelectProps = {
  variant: "avatar" | "post";
  name: React.ComponentProps<"input">["name"];
  onBlur: React.ComponentProps<"input">["onBlur"];
};

const ImageFileSelect = forwardRef<HTMLInputElement, ImageFileSelectProps>(
  ({ variant, ...inputProps }, ref) => {
    const [previewImage, setPreviewImage] = useState<string>("");

    const handleShowPreview = (
      e: React.ChangeEvent,
      files: FileList | null
    ) => {
      e.preventDefault();

      const imgFile = files && files[0];

      if (imgFile) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setPreviewImage(reader.result as string);
        });
        reader.readAsDataURL(imgFile);
      }
    };

    let width, height;
    if (variant === "avatar") {
      width = 250;
      height = 250;
    } else if (variant === "post") {
      width = 500;
      height = 250;
    }

    return (
      <label className="mx-auto cursor-pointer">
        {previewImage ? (
          <img
            className={`w-[${width}px] h-[${height}px]`}
            src={previewImage}
            alt="preview avatar"
          />
        ) : (
          <div
            className={`w-[${width}px] h-[${height}px] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-notebook-250 rounded text-[##C4C4C4]`}
          >
            <ImFilePicture size={32} />
            Select image for your {variant}
          </div>
        )}
        <input
          className="outline-0 w-0 h-0 opacity-0"
          type="file"
          {...inputProps}
          ref={ref}
          onChange={(e) => handleShowPreview(e, e.target.files)}
        />
      </label>
    );
  }
);

export default ImageFileSelect;
