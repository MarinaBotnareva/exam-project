import React from "react";
import Info from "./info.json";
import styles from "./SecondSection.module.sass";
import CONSTANTS from "../../constants";

const SecondSection = () => { 

  const info = Info;

  function imgVer (index) {
    let img = undefined;
    if (index === 0) {
      img = `${CONSTANTS.STATIC_IMAGES_PATH}firstimg.svg`;
    }
    if (index === 1) {
      img = `${CONSTANTS.STATIC_IMAGES_PATH}secondimg.svg`;
    }
    if (index === 2) {
      img = `${CONSTANTS.STATIC_IMAGES_PATH}thirdimg.svg`;
    }
    return img;
  };

  return (
    <div className={styles.field}>
      <div>
      <small className={styles.theme}>Our Services</small>
      <h2>3 Ways To Use Squadhelp</h2>
      <p>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
    </div>
    <div className={styles.container}>
          {info.map((item, index) => {
            return (
                <div className={styles.cards}>
                  <img src={imgVer(index)} />
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  <a href={item.link} className={styles.btn}>{item.button}</a>
                </div>
            );
          })}
        </div>
        </div>
  )
}

export default SecondSection




