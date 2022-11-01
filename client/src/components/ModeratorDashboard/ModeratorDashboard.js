import React from 'react';
import { connect } from 'react-redux';
import { clearOfferList, clearSetOfferApprovementError, getOfferList, setNewModeratorFilter, setOfferApprovement } from '../../actions/actionCreator';
import styles from './ModeratorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import Error from '../Error/Error';
import AllOffers from '../AllOffers/AllOffers';
import classNames from 'classnames';

class ModeratorDashboard extends React.Component {

  componentDidMount() {
    this.getOffers();
  }

  getOffers = () => {
    this.props.getOffers({approved: this.props.moderatorFilter}); 
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.moderatorFilter !== prevProps.moderatorFilter) {
      this.getOffers();
    }
  }
  
  setOfferList = () => {
    console.log(this.props)
    const array = [];
    const { offers } = this.props;
    for (let i = 0; i < offers.length; i++) {
      array.push(<AllOffers
        data={offers[i]}
        key={offers[i].id}
        setOfferApprovement={this.setOfferApprovement}
      />);
    }
    return array;
  };

  componentWillUnmount() {
    this.props.clearOfferList();
  }

  tryToGetOffer = () => {
    this.props.clearOfferList();
    this.getOffers();
  };

  setOfferApprovement = (creatorId, offerId, email, command) => {
    this.props.clearSetOfferApprovementError();
    const obj = {
      command,
      offerId,
      creatorId,
      email
    };
    this.props.setOfferApprovement(obj);
    this.getOffers();
  };

  render() {
      const { error, moderatorFilter, setOfferApprovementError } = this.props;
      return (
        <div className={styles.mainContainer}>
          <div className={styles.filterContainer}>
            <div
              onClick={() => this.props.newFilter(null)}
              className={classNames({
                [styles.activeFilter]: null === moderatorFilter,
                [styles.filter]: null !== moderatorFilter,
              })}
            >
              Need Approvement
            </div>
            <div
              onClick={() => this.props.newFilter(true)}
              className={classNames({
                [styles.activeFilter]: true === moderatorFilter,
                [styles.filter]: true !== moderatorFilter,
              })}
            >
              Appreved Offers
            </div>
            <div
              onClick={() => this.props.newFilter(false)}
              className={classNames({
                [styles.activeFilter]: false === moderatorFilter,
                [styles.filter]: false !== moderatorFilter,
              })}
            >
              Disapproved Offers
            </div>
          </div>
            
            <div className={styles.offersContainer}>
              {setOfferApprovementError && (
              <Error
                data={setOfferApprovementError.data}
                status={setOfferApprovementError.status}
                clearAppError={clearSetOfferApprovementError}
              />
              )}
              <div className={styles.offers}>
                {this.setOfferList()}
              </div>
            </div>        
        </div>
                          )
                    }
}

const mapStateToProps = (state) => state.offerStore; 

const mapDispatchToProps = (dispatch) => ({
getOffers: (data) => dispatch(getOfferList(data)),  
setOfferApprovement: (data) => dispatch(setOfferApprovement(data)),
clearSetOfferApprovementError: () => dispatch(clearSetOfferApprovementError()),
clearOfferList: () => dispatch(clearOfferList()),
newFilter: (filter) => dispatch(setNewModeratorFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
