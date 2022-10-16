import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import ModeratorDashboard from '../../components/ModeratorDashboard/ModeratorDashboard';

const Dashboard = (props) => {
  const { role, history } = props;

  let dashboardPage = null;
  if (role === CONSTANTS.CUSTOMER) {
    dashboardPage = <CustomerDashboard history={history} match={props.match} />;
  } else if (role === CONSTANTS.CREATOR) {
    dashboardPage = <CreatorDashboard history={history} match={props.match} />;
  }else if (role === CONSTANTS.MODERATOR) {
    dashboardPage = <ModeratorDashboard history={history} match={props.match} />;
  }

  return (
    <div>
      <Header />
      {dashboardPage}
    </div>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
