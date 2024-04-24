import React, { forwardRef, useState } from "react";
import { ImFilePicture } from "react-icons/im";

type SelectAvatarProps = {
  name: React.ComponentProps<"input">["name"];
  onBlur: React.ComponentProps<"input">["onBlur"];
};

const SelectAvatar = forwardRef<HTMLInputElement, SelectAvatarProps>(
  ({ ...inputProps }, ref) => {
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

    return (
      <label className="mx-auto cursor-pointer">
        {previewImage ? (
          <img
            className="w-[250px] h-[250px]"
            src={previewImage}
            alt="preview avatar"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 w-[250px] h-[250px] border-2 border-dashed border-notebook-250 rounded text-[##C4C4C4]">
            <ImFilePicture size={32} />
            Select image for your avatar
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

export default SelectAvatar;
