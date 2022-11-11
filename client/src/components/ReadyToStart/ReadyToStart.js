import React from "react";
import styles from './ReadyToStart.module.sass';
import CONSTANTS from '../../constants.js'


const ReadyToStart = () => {
  const third = styles.item + ' ' + styles.third

  return(
    <>
    <div className={styles.gradient} > 
    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}element1.svg`} className={styles.liefs} />
      <div className={styles.container}>
      <h3 className={styles.aqua}>Ready to get started?</h3>
      <p>
        Fill out your contest brief and begin receiving custom name suggestions within minutes.
      </p>
      <a className={styles.btn} href="/startContest">Start A Contest</a>
</div>
    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}element2.svg`} className={styles.liefs} />
  </div>

  <div className={styles.wrapper}>
  <div className={styles.item}>
      <img className={styles.icon} alt="stars SVG" src={`${CONSTANTS.STATIC_IMAGES_PATH}stars.svg`} />
      <p className={styles.text}><span className={styles.dark}>4.9 out of 5 stars</span> from 25,000+ customers.</p>
      </div>
      
      <div className={styles.item}>
          <img className={styles.png} alt="Image Description" src={`${CONSTANTS.STATIC_IMAGES_PATH}portrets.png`} />
        <p className={styles.text}>Our branding community stands <span className={styles.dark}>200,000+</span> strong.</p>
      </div>
  
      <div className={third}>
          <img className={styles.icon} src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.svg`} />
        <p className={styles.text}><span className={styles.dark}>140+ Industries</span> supported across more than
          <span className={styles.dark}> 85 countries</span><br/> – and counting.</p>
      </div>
    </div>

</>
  )
}

export default ReadyToStart