import React, { useState, useEffect } from 'react';
import '../AccordionList/AccordionList.css'

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
    console.log(clicked);
  };

  return (
      <div>
        <div>
          {props.infoList.map((item, index) => {
            return (
              <div className={ clicked=== index ? 'card' : 'hidden-card'}>
                <div className={ clicked=== index ? 'question' : 'question active-question'} onClick={() => toggle(index)} key={index}>
                  <h5>{item.question}</h5>
                  <span class={ clicked=== index ? 'card-btn-arrow-act': 'card-btn-arrow'}>
                      <span class="fas fa-arrow-down small"></span>
                    </span>
                </div>
                {clicked === index ? (
                  <div className='answer'>
                    {item.answer}
                  </div>
                ) : <div className='hidden'>
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