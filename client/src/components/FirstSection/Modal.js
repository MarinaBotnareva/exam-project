import React, {useEffect} from "react";
import Close from "./close.svg";
import Fullscreen from "./rectangle.svg"
import './Modal.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const Modal = ({ isVisible = false, content, onClose }) => {

  const handle = useFullScreenHandle();

  return !isVisible ? null : (
  <FullScreen handle={handle}>
    <div className="modal">
      <div className="for-close" onClick={onClose}></div>
      <div className="modal-dialog">
        <div className="modal-body">
          <div className="modal-content">
            <iframe className="video" src="https://player.vimeo.com/video/368584367?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>
        </div>
      </div> 
      <div className="btn-holder">
      <button className="modal-btn" onClick={handle.active ? handle.exit : handle.enter}>
      <img src={Fullscreen}/>
          </button>
      <button className="modal-btn" onClick={onClose}>
            <img src={Close}/>
          </button>
          </div>
    </div>
    </FullScreen>
  );
};

export default Modal