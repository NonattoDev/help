import React, { useEffect } from "react";

const Modal = ({ show, onClose, children }: { show: boolean; onClose: () => void; children: React.ReactNode }) => {
  useEffect(() => {
    if (!show) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 modal-overlay">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
