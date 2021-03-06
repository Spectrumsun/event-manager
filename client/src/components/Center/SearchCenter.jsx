import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../UI/Loading';
import Display from './getCenter';
import Footer from '../UI/Footer';
import * as action from '../../store/actions/index';


/**
 * @class Centers
 *
 * @extends {React.Component}
 */
export class Search extends Component {
  state = {
    totalPage: '',
    next: 1,
    search: '',
    pageNumber: ''
  }

  /**
   * @description run action on component mount to reload data
   *
   * @param {any} props.params.token
   *
    * @memberof EditEvent
   */

  add = () => {
    this.state.search = this.props.searchResult.searchString;
    this.state.totalPage = this.props.searchResult.pages;
    if (this.state.next < this.state.totalPage) {
      const me = ++this.state.next;
      this.setState({ next: me });
      this.state.pageNumber = me;
      this.props.onSearch(this.state.search, 6, me);
    }
  }


  minus = () => {
    const limit = 1;
    if (limit < this.state.next) {
      const me = --this.state.next;
      this.state.pageNumber = me;
      this.props.onSearch(this.state.search, 6, me);
    }
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof EditEvent
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const centers = this.props.searchResult.result === undefined || this.props.error != false ?
      <Loading /> : this.props.searchResult.result.map(center =>
        (<Link
          to={`/centers/${center.id}`}
          key={center.id}
          style={{ color: 'black' }}
        >
          <Display
            centerName={center.centerName.split(' ')[0]}
            address={center.address}
            image={center.imageurl}
            city={center.city}
          />
        </Link>
        ));
    const numberOfPages = (
      <li className="page-item">
        <a className="page-link">
                      Page {this.state.pageNumber} of {this.props.searchResult.pages }
        </a>
      </li>);
    const numberOfPages1 = (
      <li className="page-item">
        <a className="page-link">
                      Page 1  of { this.props.searchResult.pages }
        </a>
      </li>);
    return (
      <div>
        <div className="center " style={{ paddingTop: '100px' }}>
          <h1
            style={{ textAlign: 'center' }}
          >
            {this.props.searchResult.match}
          </h1>
          <div>{centers}</div>
          <ul className="pagination nav justify-content-center">
            <li className="page-item" onClick={this.minus}>
              <a className="page-link" >Previous</a>
            </li>
            {this.state.totalPage === '' ? numberOfPages1 : numberOfPages}
            <li className="page-item" onClick={this.add}>
              <a className="page-link">Next</a>
            </li>
          </ul>
          <div style={{ marginBottom: '100px' }} />
        </div>
        <Footer />
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  searchResult: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  searchResult: state.search.searchReuslt,
  error: state.search.error
});

const mapDispatchToProps = dispatch => ({
  onSearch: (search, totalPage, next) =>
    dispatch(action.initSearchCenters(search, totalPage, next))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
