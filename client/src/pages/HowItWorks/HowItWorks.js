import React from 'react';
import AccordionList from '../../components/AccordionList/AccordionList';
import Header from '../../components/Header/Header';
import launchingAContest from '../../components/AccordionList/LaunchingAContest'
import managedContests from '../../components/AccordionList/ManagedContests';
import buyingFromMarketplace from '../../components/AccordionList/BuyingFromMarketplace';
import forCreatives from '../../components/AccordionList/ForCreatives';
import FirstSection from '../../components/FirstSection/FirstSection';
import SecondSection from '../../components/SecondSection/SecondSection';
import ThirdSection from '../../components/ThirdSection/ThirdSection';
import ReadyToStart from '../../components/ReadyToStart/ReadyToStart';
import Footer from '../../components/Footer/Footer';
import Questions from '../../components/Questions/Questions';
import "./HowItWorks.css"
import styles from "./HowItWorks.module.sass"

const HowItWorks = () => {
  
  return (
    <>
    <Header/>
    <FirstSection/>
    <SecondSection/>
    <ThirdSection/>
    <article className={styles.accordion}>
      <nav className={styles.nav}>
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
      <section className={styles.list}>
        <div id="contests" className={styles.spaceBottom}>
        <div><h3>Launching A Contest</h3>
        <AccordionList infoList={launchingAContest}/></div>
        </div>
        <div id="marketplace" className={styles.spaceBottom}>
        <div><h3>Buying From Marketplace</h3>
        <AccordionList infoList={buyingFromMarketplace}/></div>
        </div>
        <div className={styles.spaceBottom} id="managed">
        <div ><h3>Managed Contests</h3>
        <AccordionList infoList={managedContests}/></div>
        </div>
        <div className={styles.spaceBottom} id="creatives">
        <div ><h3>For Creatives</h3>
        <AccordionList infoList={forCreatives}/></div>
        </div>
      </section> 
      </div>
    </article>
    <ReadyToStart/>
    <Questions/>
    <div className={styles.sponsors} >
    <h4>
      Featured In
    </h4>
    <div className={styles.sponsorsContainer}>
              <a className={styles.sponsor} href="https://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199" target="_blank">
                <img src='https://www.squadhelp.com/resources/assets/imgs/front/forbes.svg' alt="forbes" />
              </a>
              <a className={styles.sponsor} href="http://thenextweb.com/contributors/crowdsource-startup-name-with-squadhelp/" target="_blank">
                <img
                    src='https://www.squadhelp.com/resources/assets/imgs/front/TNW.svg'
                    alt="web"
                  />
              </a>
              <a className={styles.sponsor} href="http://www.chicagotribune.com/bluesky/originals/ct-squadhelp-startup-names-bsi-20170331-story.html" target="_blank">
              <img
                    src='https://www.squadhelp.com/resources/assets/imgs/front/chicago.svg'
                    alt="Chicago Times"
                  />
              </a>
              <a className={styles.sponsor} href="https://mashable.com/2011/04/01/make-money-crowdworking/" target="_blank">
                 <img
                    src='https://www.squadhelp.com/resources/assets/imgs/front/Mashable.svg'
                    alt="mashable"
                  />
              </a>
        </div>
        </div>
    <Footer/>
    </>
  )
}  

export default HowItWorks