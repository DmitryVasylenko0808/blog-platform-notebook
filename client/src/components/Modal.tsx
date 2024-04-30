import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="w-screen h-screen fixed left-0 top-0 bg-black/35 flex items-center justify-center z-10">
      <div className="relative p-8 pt-16 bg-white rounded-md shadow-lg">
        <button
          className="absolute top-4 right-4"
          aria-label="close"
          onClick={onClose}
        >
          <MdOutlineClose size={32} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
