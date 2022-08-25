import React from 'react';
import Cup from './cup.svg';
import Man from './man.svg';
import './ThirdSection.css';

const listInfo = ["Fill out your Naming Brief and begin receiving name ideas in minutes", "Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.", "Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.", "Pick a Winner. The winner gets paid for their submission." ]

const ThirdSection = () => {
  return (
    <div class="section space-2">

    <div class="section-title">
      <img class='icons' src={Cup}/>
      <h2 class="font-weight-medium">How Do Naming Contests Work?</h2>
    </div>
   
      <div class="container wrapper">
        <ul class="list-unstyled">
          {listInfo.map((item, index) => {
              return (
                <>
                <li class="chain">
                  <div className='list-border'>
                    <span class="list-num">{index + 1 + "."}</span>
                    <p class="list-text">{item}</p>
                    </div>
              </li>
              </>
              );
            })}
          
        </ul>

      <img src={Man}/>

    </div>
  </div>
  )
}

export default ThirdSection