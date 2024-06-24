import React from "react";

const Modal = ({ show, onClose, children }: { show: any; onClose: any; children: any }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-3 rounded shadow-lg w-1/3 relative">
        <div className="flex justify-end">
          <button onClick={onClose} className="btn btn-circle btn-xs btn-error text-white hover:text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-content mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
