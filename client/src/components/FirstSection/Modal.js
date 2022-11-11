import React, {useEffect} from "react";
import styles from './Modal.module.sass';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import CONSTANTS from "../../constants";

const Modal = ({ isVisible = false, onClose }) => {

  const handle = useFullScreenHandle();

  return !isVisible ? null : (
  <FullScreen handle={handle}>
    <div className={styles.modal}>
      <div className={styles.forClose} onClick={onClose}></div>
      <div className={styles.modalMain}>
        <iframe className={styles.video} src="https://player.vimeo.com/video/368584367?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
      </div> 
      <div className={styles.btnHolder} >
      <button className={styles.btn} onClick={handle.active ? handle.exit : handle.enter}>
      <img src={`${CONSTANTS.STATIC_IMAGES_PATH}rectangle.svg`}/>
          </button>
      <button className={styles.btn} onClick={onClose}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}close.svg`}/>
          </button>
          </div>
    </div>
    </FullScreen>
  );
};

export default Modal