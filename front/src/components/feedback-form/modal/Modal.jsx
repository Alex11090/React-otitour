import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Закрываем модальное окно только если клик произошел именно за его пределами
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal_f">
        <button className="close-button" onClick={onClose}>
          Закрити
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
