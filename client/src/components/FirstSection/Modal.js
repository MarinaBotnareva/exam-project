import React, {useEffect} from "react";
import Close from "./close.svg";
import Fullscreen from "./rectangle.svg"
import './Modal.css';

const Modal = ({ isVisible = false, title, content, footer, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog">
         
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
      </div> 
      <div className="btn-holder">
      <button className="modal-btn fancybox-button" onClick={onClose}>
      <img src={Fullscreen}/>
          </button>
      <button className="modal-btn fancybox-button" onClick={onClose}>
            <img src={Close}/>
          </button>
          </div>
    </div>
  );
};

export default Modal