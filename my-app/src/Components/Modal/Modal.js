import React, { useEffect, useRef } from "react";

const Modal = ({ handleClose, content, header }) => {
  const modalRef = useRef();

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  // Close on click outside modal
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md md:max-w-2xl bg-white rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg md:text-xl font-semibold">{header}</h2>
          <button
            onClick={handleClose}
            className="text-lg font-bold text-gray-700 hover:text-red-600"
            aria-label="Close Modal"
          ></button>
        </div>
        <div className="mt-4">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
