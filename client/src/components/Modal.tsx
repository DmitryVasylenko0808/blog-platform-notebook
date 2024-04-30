import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

const Modal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => setIsOpen(false);

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="w-screen h-screen fixed left-0 top-0 bg-black/35 flex items-center justify-center z-10">
      <div className="relative p-8 pt-16 bg-white rounded-md shadow-lg">
        <button
          className="absolute top-4 right-4"
          aria-label="close"
          onClick={handleClose}
        >
          <MdOutlineClose size={32} />
        </button>
        Modal
      </div>
    </div>
  );
};

export default Modal;
