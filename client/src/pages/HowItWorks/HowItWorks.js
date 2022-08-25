import React from 'react';
import AccordionList from '../../components/AccordionList/AccordionList';
import Header from '../../components/Header/Header';
import LaunchingAContest from '../../components/AccordionList/LaunchingAContest.json'
import BuyingFromMarketplace from '../../components/AccordionList/BuyingFromMarketplace.json'
import "../HowItWorks/HowItWorks.css"
import FirstSection from '../../components/FirstSection/FirstSection';
import SecondSection from '../../components/SecondSection/SecondSection';
import ThirdSection from '../../components/ThirdSection/ThirdSection';
import ReadyToStart from '../../components/ReadyToStart/ReadyToStart';
import Footer from '../../components/Footer/Footer';

const HowItWorks = () => {

  const launchingAContest = LaunchingAContest;
  const buyingFromMarketplace = BuyingFromMarketplace;
  return (
    <>
    <Header/>
    <FirstSection/>
    <SecondSection/>
    <ThirdSection/>
    <article class="accordion">
      <nav class="nav">
        <ul>
          <li>
            <a href="#contests">Launching A Contest</a>
          </li>
          <li>
            <a href="#marketplace">Buying From Marketplace</a>
          </li>
          <li>
            <a href="#managed">Managed Contests</a>
          </li>
          <li>
            <a href="#creatives">For Creatives</a>
          </li>
        </ul>
      </nav>
      <div>
      <section class="list">
        <div id="contests" className='space-bottom'>
        <div><h3>Launching A Contest</h3>
        <AccordionList infoList={launchingAContest}/></div>
        </div>
        <div id="marketplace" className='space-bottom'>
        <div><h3>Buying From Marketplace</h3>
        <AccordionList infoList={buyingFromMarketplace}/></div>
        </div>
        <div className='space-bottom' id="managed">
        <div ><h3>Managed Contests</h3>
        <AccordionList infoList={buyingFromMarketplace}/></div>
        </div>
        <div className='space-bottom' id="creatives">
        <div ><h3>For Creatives</h3>
        <AccordionList infoList={buyingFromMarketplace}/></div>
        </div>
      </section> 
      </div>
    </article>
    <ReadyToStart/>
    <Footer/>
    </>
  )
}  

export default HowItWorks