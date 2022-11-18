import React, { useState } from 'react';
import Modal from './Modal';
import styles from './FirstSection.module.sass';
import CONSTANTS from '../../constants';

const divStyle = {
  width: '100px',
};

const FirstSection = () => {
  const [isModal, setModal] = useState(false);
  return (
    <>
      <article>
        <section className={styles.container}>
          <div className={styles.text}>
            <span className={styles.theme}>World's #1 Naming Platform</span>
            <h1>How Does Squadhelp Work?</h1>
            <p>
              Squadhelp helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                data-fancybox=""
                onClick={() => setModal(true)}
              >
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}play.png`}
                  className={styles.play}
                />
                Play Video
              </button>
            </div>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}manWithMob.svg`}
            className={styles.firstIcon}
          />
        </section>

        <Modal isVisible={isModal} onClose={() => setModal(false)} />
      </article>
    </>
  );
};

export default FirstSection;
