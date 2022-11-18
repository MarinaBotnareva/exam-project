import React, { Component } from 'react';
import styles from './Pagination.module.sass';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    const {
      totalRecords = null,
      pageLimit = 8,
      pageNeighbours = 0,
      totalPages,
    } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 8;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    this.totalPages = typeof totalPages === 'number' ? totalPages : 1;

    this.pageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
    console.log(this.props);
  }

  gotoPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    return (
      <ul className={styles.pagination}>
        {currentPage === 1 || currentPage - 1 === 1 ? null : (
          <>
            <li className={styles.page}>
              <div
                className={styles.pageLink}
                onClick={(e) => this.handleClick(1, e)}
              >
                1
              </div>
            </li>
            <li className={styles.page}>
              <div
                className={styles.pageLink}
                aria-label="Previous"
                onClick={this.handleMoveLeft}
              >
                <span>&laquo;</span>
              </div>
            </li>
          </>
        )}
        {currentPage === 1 ? null : (
          <li className={styles.page}>
            <div
              className={styles.pageLink}
              onClick={(e) => this.handleClick(currentPage - 1, e)}
            >
              {currentPage - 1}
            </div>
          </li>
        )}

        <li className={styles.active}>
          <div
            className={styles.pageLink}
            onClick={(e) => this.handleClick(currentPage, e)}
          >
            {currentPage}
          </div>
        </li>

        {currentPage === 7 ? null : (
          <li className={styles.page}>
            <div
              className={styles.pageLink}
              onClick={(e) => this.handleClick(currentPage + 1, e)}
            >
              {currentPage + 1}
            </div>
          </li>
        )}
        {currentPage === 7 || currentPage + 1 === 7 ? null : (
          <>
            <li className={styles.page}>
              <div
                className={styles.pageLink}
                aria-label="Next"
                onClick={this.handleMoveRight}
              >
                <span>&raquo;</span>
              </div>
            </li>
            <li className={styles.page}>
              <div
                className={styles.pageLink}
                onClick={(e) => this.handleClick(this.totalPages, e)}
              >
                {this.totalPages}
              </div>
            </li>
          </>
        )}
      </ul>
    );
  }
}

export default Pagination;
