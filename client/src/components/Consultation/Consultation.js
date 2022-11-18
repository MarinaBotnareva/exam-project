import React, { useState } from 'react';
import RequestForm from '../RequestForm/RequestForm';
import styles from './Consultation.module.sass';
import CONSTANTS from '../../constants';

const Consultation = ({ isVisible = false, onClose }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventInfo, setEventInfo] = useState(false);

  return !isVisible ? null : (
    <div className={styles.modal}>
      <div className={styles.forClose} onClick={onClose}></div>
      <div className={styles.modalMain}>
        {!eventInfo ? (
          <>
            <div className={styles.leftSide}>
              {!isSelected ? null : (
                <div
                  className={styles.back}
                  onClick={() => {
                    setIsSelected(false);
                  }}
                >
                  <img src={`${CONSTANTS.STATIC_IMAGES_PATH}left.png`} />
                </div>
              )}
              <img
                className={styles.logo}
                src="https://d3v0px0pttie1i.cloudfront.net/uploads/team/avatar/21443/7eb8e67e.jpg"
                alt="Avatar"
              />
              <h5>Squadhelp</h5>
              <h4>Squadhelp Branding Consultation</h4>
              <div className={styles.textContainer}>
                <img
                  className={styles.icon}
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`}
                  alt="clock"
                />
                <h5>30 min</h5>
              </div>
              {isSelected ? (
                <div className={styles.textContainer}>
                  <img
                    className={styles.icon}
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}planner.png`}
                    alt="clock"
                  />
                  <h5>{eventDate}</h5>
                </div>
              ) : (
                <p>
                  Call with our branding & sales consultant to understand how
                  Squadhelp can assist you with your branding project.{' '}
                </p>
              )}
            </div>
            <RequestForm
              isSelected={isSelected}
              setIsSelected={() => setIsSelected(true)}
              setEventDate={(info) => setEventDate(info)}
              setEventInfo={() => setEventInfo(true)}
            />
          </>
        ) : (
          <div className={styles.congtats}>
            <h4>Confirmed</h4>
            <p>You are scheduled with Callie Elizabeth.</p>
            <h4>Squadhelp Branding Consultation</h4>
            <div className={styles.textContainer}>
              <img
                className={styles.icon}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}planner.png`}
                alt="clock"
              />
              <h5>{eventDate}</h5>
            </div>
          </div>
        )}
      </div>
      <div className={styles.btnHolder}>
        <button className={styles.btn} onClick={onClose}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}close.svg`} />
        </button>
      </div>
    </div>
  );
};

export default Consultation;
