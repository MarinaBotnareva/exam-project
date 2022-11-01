import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import {
  changeShowImage,
} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './AllOffers.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AllOffers = (props) => {

  const approveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferApprovement(props.data.User.id, props.data.id, props.data.User.email, 'true'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const disaproveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferApprovement(props.data.User.id, props.data.id, props.data.User.email, 'false'),
        },
        {
          label: 'No',
        },
      ],
    });
  };
 
  const offerApprovement = () => {
    const { approved } = props.data;
    if (approved === false) {
      return <i className={classNames('fas fa-times-circle reject', styles.disapproved)} />;
    } if (approved === true) {
      return <i className={classNames('fas fa-check-circle resolve', styles.approved)} />;
    }
    return null;
  };
 

  const {
    data
  } = props;
  const {
    avatar, firstName, lastName, email
  } = props.data.User;
  const {
    typeOfTagline, brandStyle, typeOfName, styleName, contestType,
    industry, nameVenture
  } = props.data.Contest;
  console.log(props)
  return (
    <div className={styles.offerContainer}>
      <div className={styles.dataContainer}>
      <span className={styles.lable}>Contest: </span>
            <span className={styles.data}> {contestType} /</span>
       
      {
                    contestType === CONSTANTS.NAME_CONTEST
                      ? <>
                          <span className={styles.data}>{typeOfName} /</span>
                          <span className={styles.data}>{styleName} /</span>
                      </>
                      : (
                        contestType === CONSTANTS.TAGLINE_CONTEST
                          ? (
                            <>
                              {nameVenture && (
                                <span className={styles.data}>{nameVenture} /</span>
                              )}
                                <span className={styles.data}>{typeOfTagline} /</span>
                            </>
                          )
                          : (<>
                              {nameVenture && (
                                <span className={styles.data}>{nameVenture} /</span>
                              )}
                                <span className={styles.data}>{brandStyle} /</span>
                            </>)
                      )
                }
          <span className={styles.data}>{industry}</span>
        </div>
      {offerApprovement()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
          </div>
        </div>
        <div className={styles.responseConainer}>
          {
                        data.fileName !== null
                          ? (
                            <img
                              onClick={() => props.changeShowImage({ imagePath: data.fileName, isShowOnFull: true })}
                              className={styles.responseLogo}
                              src={`${CONSTANTS.publicURL}${data.fileName}`}
                              alt="logo"
                            />
                          )
                          : <span className={styles.response}>{data.text}</span>
                    }
        </div>
      </div>
      {data.approved === null && (
      <div className={styles.btnsContainer}>
        <div onClick={approveOffer} className={styles.approveBtn}>Approve</div>
        <div onClick={disaproveOffer} className={styles.disapproveBtn}>Disapprove</div>
      </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

const mapStateToProps = (state) => {
  const { id, role } = state.userStore.data;
  return {
    id, role,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOffers));