import React from 'react';
import styles from './ThirdSection.module.sass';
import CONSTANTS from "../../constants";

const listInfo = ["Fill out your Naming Brief and begin receiving name ideas in minutes", "Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.", "Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.", "Pick a Winner. The winner gets paid for their submission." ]

const ThirdSection = () => {
  return (
  <div className={styles.section}>
    <div className={styles.sectionTitle}>
      <img className={styles.icons} src={`${CONSTANTS.STATIC_IMAGES_PATH}cup.svg`}/>
      <h2>How Do Naming Contests Work?</h2>
    </div>
    <div className={styles.container}>
      <ul className={styles.list}>
        {listInfo.map((item, index) => {
            return (
            <>
              <li className={styles.chain}>
                <div className={styles.border}>
                  <span className={styles.num}>{index + 1 + "."}</span>
                  <p className={styles.listText}>{item}</p>
                </div>
              </li>
            </>
            );
          })}
      </ul>
      <img src={`${CONSTANTS.STATIC_IMAGES_PATH}man.svg`}/>
    </div>
  </div>
  )
}

export default ThirdSection