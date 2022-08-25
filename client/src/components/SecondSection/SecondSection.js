import React, {useState} from "react";
import Info from "./info.json";
import Firstimg from "./firstimg.svg";
import Secondimg from "./secondimg.svg";
import Therdimg from "./thirdimg.svg";
import "./SecondSection.css"

const SecondSection = () => {

  const info = Info;

  function imgVer (index) {
    let img = undefined;
    if (index === 0) {
      img = Firstimg;
    }
    if (index === 1) {
      img = Secondimg;
    }
    if (index === 2) {
      img = Therdimg;
    }
    return img;
  };

  return (
    <div className='section'>
      <div>
      <small class="btn btn-xs btn-soft-primary btn-pill mb-2">Our Services</small>
      <h2 class="font-weight-normal">3 Ways To Use Squadhelp</h2>
      <p class="mb-0">Squadhelp offers 3 ways to get you a perfect name for your business.</p>
    </div>
    <div className="container">
          {info.map((item, index) => {
            return (
                <div className="cards">
                  <img src={imgVer(index)} className="mini-icon icons" />
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  <div className="mb-9">
                  <a href={item.link} class="btn btn-primary link-btn shadow">{item.button}</a>
                  </div>
                </div>
            );
          })}
        </div>
        </div>
  )
}

export default SecondSection




