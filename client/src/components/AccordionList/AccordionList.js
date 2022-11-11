import React, { useState, useEffect } from 'react';
import styles from './AccordionList.module.sass'

function AccordionList (props) {
  const [clicked, setClicked] = useState();

  useEffect(() => {
    setClicked(0);
  },[]);
  
  const toggle = index => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
      <div>
        <div>
          {props.infoList.map((item, index) => {
            return (
              <div className={styles.card}>
                <div className={styles.question} onClick={() => toggle(index)} key={index}>
                  <h5>{item.question}</h5>
                  <span className={ clicked=== index ? styles.arrowAct : styles.arrow}>
                      <span className="fas fa-arrow-down"></span>
                    </span>
                </div>
                {clicked === index ? (
                  <div className={styles.answer}>
                    {item.answer}
                  </div>
                ) : <div className={styles.hidden}>
                {item.answer}
              </div>}
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default AccordionList;