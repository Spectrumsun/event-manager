/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CenterFrom from './Form/CenterForm';
import * as action from '../../store/actions/index';
import uploadImage from '../../static/js/ImageUpload';
import { checkCenter, uploadError } from '../../static/js/validator';

/**
 * @class EditCenter
 *
 * @extends {React.Component}
 */
export class EditCenter extends Component {
    state = {
      name: this.props.loadedCenter.centerName,
      city: this.props.loadedCenter.city,
      address: this.props.loadedCenter.address,
      about: this.props.loadedCenter.about,
      availability: this.props.loadedCenter.availability,
      facility: this.props.loadedCenter.facility || [],
      values: '',
      image: '',
      preview: this.props.loadedCenter.imageurl,
      imageurl: this.props.loadedCenter.imageurl,
      publicUrlId: this.props.loadedCenter.imageId,
      progress: `${0}%`,
      oldpublicId: this.props.loadedCenter.imageId,
      formValid: false

    }

  /**
   * @description update facility state
   *
   * @param {any} event
   *
   * @memberof EditCenter
   *
   * @returns {void}
   */
    onClick = () => {
      this.setState({
        facility:
        this.state.facility.concat([this.state.values])
      });
      this.setState({ values: '' });
    }

  /**
   * @description update component state with current value in dom
   *
   * @param {any} event
   *
   * @memberof EditCenter
   *
   * @returns {void}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description vaildate data in state and upload the image
   * sends state to api with action dispatch
   * @param {any} event
   *
   * @memberof EditCenter
   *
   * @returns {void}
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ check: false });
    checkCenter(this.state.name, this.state.city, this.state.address, this.state.about, this.state.availability, this.state.facility, this.state.image, (err, res) => {
      if (res) {
        const fd = new FormData();
        const id = `${Date.now()}-${this.state.image.name}`;
        this.setState({ check: true });
        fd.append('file', this.state.image);
        fd.append('public_id', id);
        fd.append('upload_preset', 'eventmanager');
        if (this.state.image === '') {
          this.props.initEditCenter(
            this.props.match.params.id,
            this.state, this.props.history
          );
        } else {
          const fileProgress = {
            onUploadProgress: (progressEvent) => {
              const progressMeter = `${Math.round(progressEvent.loaded / progressEvent.total * 100)}%`;
              this.setState({ progress: progressMeter });
            }
          };
          uploadImage(fd, fileProgress)
            .then((response) => {
              this.setState({
                imageurl: response.data.secure_url,
                publicUrlId: response.data.public_id,
                image: null,
                preview: null,
                check: true
              });
              this.props.initEditCenter(
                this.props.match.params.id,
                this.state,
                this.props.history
              );
            })
            .catch((err) => {
              uploadError();
              this.setState({ check: false });
            });
        }
      }
    });
  }

  /**
   * @description prefent the enter key from submitting the form
   *
   * @param {any} event
   *
   * @memberof AddCenter
   *
   * @returns {void}
   */
  onKeyPress = (event) => {
    if (event.target.type !== 'textarea' && event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  /**
   * @description upload image and return url
   * sends set state to image url
   * @param {any} event
   *
   * @memberof EditCenter
   *
   * @returns {void}
   */
    handleImageChange = (event) => {
      event.preventDefault();
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          image: file,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }

    /**
   * @description remove add Facility
   *
   * @param {any} event
   *
   * @memberof EditCenter
   *
   * @returns {void}
   */
    removeFacility = (remove) => {
      const array = this.state.facility;
      array.splice(remove, 1);
      this.setState({ facility: array });
    }

    /**
   * @description renders component to the DOM
   *
   * @memberof EditCenter
   *
   * @returns {JSX} JSX representation of component
   */
    render() {
      const { preview } = this.state;
      let imagePreview = null;
      if (preview) {
        imagePreview = (<img
          src={preview}
          alt="ImagePreview"
          className="imgPre"
        />);
      }

      return (
        <div className="container" style={{ paddingTop: '100px' }}>
          <div className="card card w-50 loginCard ">
            <div className="card-header dark">
              <h1 className="color">Edit Center</h1>
            </div>
            <CenterFrom
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              name={this.state.name}
              city={this.state.city}
              about={this.state.about}
              address={this.state.address}
              availability={this.state.availability}
              values={this.state.values}
              handleImageChange={this.handleImageChange}
              onClick={this.onClick}
              removeFacility={this.removeFacility}
              facility={this.state.facility}
              imagePreview={imagePreview}
              disabled={this.state.values}
              progress={this.state.progress}
              onKeyPress={this.onKeyPress}
              formValid={this.state.formValid}
            />
          </div>
        </div>
      );
    }
}

EditCenter.propTypes = {
  initEditCenter: PropTypes.func.isRequired,
  loadedCenter: PropTypes.shape({
    centerName: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
    facility: PropTypes.array.isRequired,
    imageurl: PropTypes.string.isRequired,
    imageId: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};


EditCenter.defaultProps = {
  loadedCenter: PropTypes.shape({
    userId: 1,
    eventName: 'eventName',
    startDate: '2018-10-02',
    endDate: '2018-10-02',
    time: '11:00',
    purpose: 'fun',
    facility: ['example']
  }),
};


const mapStateToProps = state => ({
  loadedCenter: state.centers.loadedCenter,
});

export const mapDispatchToProps = dispatch => ({
  initEditCenter: (id, input, history) =>
    dispatch(action.initEditCenter(id, input, history)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCenter);
