import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <img src={imageSrc} alt="Modal" className="modal-image" />
      </div>
    </div>
  );
};

export default Modal;
