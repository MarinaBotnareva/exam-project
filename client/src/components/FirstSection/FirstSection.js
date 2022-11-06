import React, {useState} from "react";
import ManWithMob from "./manWithMob.svg"
import Modal from "./Modal";
import './FirstSection.css';

const divStyle = {
  width: '100px',
};

const FirstSection = () => {
  const [isModal, setModal] = useState(false);
  return (
    <>
    <article>
      <section className="top-container">
        <div className="text">
        <span class="btn btn-xs btn-soft-primary btn-pill mb-2">World's #1 Naming Platform</span>
          <h1>How Does Squadhelp Work?</h1> 
          <p>Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.</p>
          <div className="mb-9">
            <button class="btn top-btn btn-primary btn-pill shadow" data-fancybox="" onClick={() => setModal(true)}>
              <small class="fas fa-play mr-2"></small>
                Play Video
            </button>
          </div>
        </div>
        <div className="icon">
            <img src={ManWithMob} class="first-icon" />
        </div>
      </section>

      <Modal

        isVisible={isModal}
        onClose={() => setModal(false)}
      />
    </article>
    </>
  )
}

export default FirstSection