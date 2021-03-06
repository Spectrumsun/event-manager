import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../UI/Loading';
import Display from './getCenter';
import Footer from '../UI/Footer';
import * as actions from '../../store/actions/index';


/**
 * @class Centers
 *
 * @extends {React.Component}
 */
export class Centers extends Component {
  state = {
    totalPage: '',
    next: 1,
    pageNumber: ''
  }


  /**
   * @description run action on component mount to reload data
   *
   * @param {any} props.params.token
   *
    * @memberof EditEvent
   */
  componentDidMount() {
    this.props.onInitCenters(6, 1);
  }



  add = () => {
    this.state.totalPage = this.props.page.pages;
    if (this.state.next < this.state.totalPage) {
      const nextPage = ++this.state.next;
      this.setState({ pageNumber: nextPage });
      this.setState({ next: nextPage });
      this.props.onInitCenters(3, nextPage);
    }
  }

  minus = () => {
    const limit = 1;
    if (limit < this.state.next) {
      const nextPage = --this.state.next;
      this.state.pageNumber = nextPage;
      this.props.onInitCenters(3, nextPage);
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
    const centers = this.props.center ===
    undefined || this.props.error != false ?
      <Loading /> : this.props.center.map(center =>
        (<Link
          to={`/centers/${center.id}`}
          key={center.id}
          style={{ color: 'black' }}
        >
          <Display
            centerName={center.centerName.split(' ')[0]}
            city={center.city}
            image={center.imageurl}
          />
        </Link>
        ));
    const numberOfPages = (
      <li className="page-item">
        <a className="page-link">
                Page {this.state.pageNumber} of {this.state.totalPage}
          </a>
      </li>);
    const numberOfPages1 = (
      <li className="page-item">
        <a className="page-link">
                Page 1  of {this.props.page.pages }
        </a>
      </li>);
    return (
      <div>
        <div className="center" style={{ paddingTop: '100px' }}>
          <h1 style={{ textAlign: 'center' }}>Centers</h1>
          <div className="fixModal">
            {centers}
          </div>
          <ul className="pagination nav justify-content-center">
            <li className="page-item" onClick={this.minus}>
              <a className="page-link" >Previous</a>
            </li>
            {this.state.totalPage === '' ? numberOfPages1 : numberOfPages}
            <li className="page-item" onClick={this.add}>
              <a className="page-link">Next </a>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

Centers.propTypes = {
  onInitCenters: PropTypes.func.isRequired,
  center: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  page: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  center: state.centers.center,
  page: state.centers.pagination,
  error: state.centers.error
});

const mapDispatchToProps = dispatch => ({
  onInitCenters: (limit, page) =>
    dispatch(actions.initCenters(limit, page))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Centers);
