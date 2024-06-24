import React from "react";

const Modal = ({ show, onClose, children }: { show: any; onClose: any; children: any }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
