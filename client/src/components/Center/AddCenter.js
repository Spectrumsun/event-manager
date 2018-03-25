import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'toastr';
import PropTypes from 'prop-types';
import CenterFrom from './Form/CenterForm';
import * as action from '../../store/actions/index';

class AddCenter extends Component {
    state = {
      name: '',
      city: '',
      address: '',
      availability: '',
      values: '',
      facility: []
    }

  onClick = () => {
    this.setState({ facility: this.state.facility.concat([this.state.values]) });
    this.setState({ values: '' });
  }

   onChange = (e) => {
     this.setState({ [e.target.name]: e.target.value });
   }

   onSubmit = (e) => {
     e.preventDefault();
     if (this.state.name === '') {
       toast.error('Center Name cannot be blank');
     } else if (this.state.date === '') {
       toast.error('Center city cannot be blank');
     } else if (this.state.time === '') {
       toast.error('Center Address cannot be blank');
     } else if (this.state.purpose === '') {
       toast.error('Center Availability must be set');
     } else {
       this.props.initPostCenters(
         this.state,
         this.props.history
       );
     }
   }

    removeFacility = (i) => {
      const array = this.state.facility;
      array.splice(i, 1);
      this.setState({ facility: array });
    }

    render() {
      return (
        <div className="container" style={{ paddingTop: '100px' }}>
          <div className="card card w-50 loginCard ">
            <div className="card-header dark">
              <h1 className="color">Add Center</h1>
            </div>
            <CenterFrom
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              centerName={this.state.name}
              city={this.state.city}
              address={this.state.address}
              availability={this.state.availability}
              values={this.state.values}
              onClick={this.onClick}
              removeFacility={this.removeFacility}
              facility={this.state.facility}
              disabled={this.state.values}
            />
          </div>
        </div>
      );
    }
}

AddCenter.propTypes = {
  initPostCenters: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};


const mapDispatchToProps = dispatch => ({
  initPostCenters: (input, history) => dispatch(action.initPostCenters(input, history)),
});

export default connect(null, mapDispatchToProps)(AddCenter);
