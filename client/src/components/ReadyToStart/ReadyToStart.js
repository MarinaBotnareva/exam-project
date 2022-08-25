import React from "react";
import Element1 from './element1.svg';
import Element2 from './element2.svg';
import './ReadyToStart.css';
import Stars from './stars.svg';
import Portrets from './portrets.png'
import Files from './sharing-files.svg';

const ReadyToStart = () => {

  return(
    <>
    <div className="gradient" > 
    <img src={Element1} className="liefs" />
      <div className="item-container">
      <h3 className="aqua">Ready to get started?</h3>
      <p class="white">
        Fill out your contest brief and begin receiving custom name suggestions within minutes.
      </p>
      <div className="button-wrap">
      <a class="btn btn-white btn-wide shadow" href="/startContest">Start A Contest</a>
      </div>
</div>
    <img src={Element2} className="liefs" />
  </div>

  <div class="container">
  <div class="separator item">
      <img class="lazy loaded mini-icon" alt="stars SVG" src={Stars} />
      <p className="item-text"><span class="text-dark">4.9 out of 5 stars</span> from 25,000+ customers.</p>
      </div>
      
      <div class="separator item">
          <img class="img-fluid png" alt="Image Description" src={Portrets} />
        <p className="item-text">Our branding community stands <span class="text-dark">200,000+</span> strong.</p>
      </div>
  
      <div class="item">
          <img class="lazy loaded mini-icon" src={Files} />
        <p className="item-text"><span class="text-dark">140+ Industries</span> supported across more than
          <span class="text-dark"> 85 countries</span><br/> – and counting.</p>
      </div>
    </div>

    <div class="container space-1 space-lg-1">

    <div class="row no-gutters align-items-lg-center mb-11">
      <div class="col-lg-7 shadow-lg rounded">
        <div class="py-9 px-5 px-sm-9">

          <ul class="list-unstyled">
            <li class="media pb-3">
              <span class="btn btn-sm btn-icon btn-soft-primary rounded-circle mr-3">
                <span class="fas fa-angle-right btn-icon__inner"></span>
              </span>
              <div class="media-body">
                <h4 class="h5 mb-1">Pay a Fraction of cost vs hiring an agency</h4>
                <p class="small">For as low as $199, our naming contests and marketplace allow you
                  to
                  get an amazing brand quickly and affordably.</p>
              </div>
            </li>
            <li class="border-top  py-3"></li>
            <li class="media">
              <span class="btn btn-sm btn-icon btn-soft-primary rounded-circle mr-3">
                <span class="fas fa-angle-right btn-icon__inner"></span>
              </span>
              <div class="media-body">
                <h4 class="h4 mb-1">Satisfaction Guarantee</h4>
                <p class="small">Of course! We have policies in place to ensure that you are
                  satisfied
                  with your experience. <a href="#satisfactionGaurenteedModal" data-modal-target="#satisfactionGaurenteedModal" data-modal-effect="fadein">Learn more</a></p>
              </div>
            </li>
          </ul>
  
        </div>
      </div>


      <div class="col-lg-5 bg-primary">
        <div class="py-9 px-5 px-sm-9">

          <ul class="list-unstyled">
            <li class="media pb-3">
              <div class="media-body">
                <h4 class="h2 text-white mb-1">Questions?</h4>
                <p class="text-white small">Speak with a Squadhelp platform expert to learn more and get
                  your
                  questions answered.</p>
                <button onclick="scheduleConsultationClick()" class="btn btn-white btn-wide btn-pill text-primary shadow-soft transition-3d-hover">
                  Schedule Consultation
                </button><br/><br/>
                <a href="" class="clus text-white small">
                  <img class="lazy loaded" data-src="/resources/assets/imgs/front/phone_icon.svg" alt="phone icon svg" src="/resources/assets/imgs/front/phone_icon.svg" data-was-processed="true"/>
                  &nbsp; (877) 355-3585
                </a><br/>
                <span class="text-white mt-2 d-inline-block small">Call us for assistance</span>
              </div>
            </li>
          </ul>
     
        </div>
      </div>

    </div>
  </div>
</>
  )
}

export default ReadyToStart