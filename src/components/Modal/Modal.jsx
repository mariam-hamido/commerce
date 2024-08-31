import React from 'react';



const Modal = ({ show, onClose, title, image }) => {
  console.log('Modal props:', { show, onClose, title, image });
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
