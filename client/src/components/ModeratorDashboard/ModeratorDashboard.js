import React from 'react';
import { connect } from 'react-redux';
import { clearContestList, getContestsForModerator } from '../../actions/actionCreator';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from '../CustomerDashboard/CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

class ModeratorDashboard extends React.Component {

  componentDidMount() {
    this.getContests();
  }

  getContests = () => {
    this.props.getContests({ limit: 8 });
  };

  goToExtended = (contest_id) => {
    this.props.history.push(`/contest/${contest_id}`);
  };

  setContestList = () => {
    console.log(this.props)
    const array = [];
    const { contests } = this.props;
    for (let i = 0; i < contests.length; i++) {
      array.push(<ContestBox
        data={contests[i]}
        key={contests[i].id}
        goToExtended={this.goToExtended}
      />);
    }
    return array;
  };

  componentWillUnmount() {
    this.props.clearContestsList();
  }

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  render() {
    const { error } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contestsContainer}>
          {
                      error
                        ? <TryAgain getData={this.tryToGetContest()} />
                        : (
                          <ContestsContainer
                            isFetching={this.props.isFetching}
                            history={this.props.history}
                          >
                            {this.setContestList()}
                          </ContestsContainer>
                        )
                  }
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
getContests: (data) => dispatch(getContestsForModerator(data)),
clearContestsList: () => dispatch(clearContestList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
