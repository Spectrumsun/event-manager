import React from 'react';
import PickCenter from '../../Center/PickCenter';

const eventForm = props => (
  <div className="card-body" >
    {props.errorMessage}
    {props.successMessage}
    <form onSubmit={props.onSubmit}>
      <div className="form-row">
        <div className="form-group col-md-12">
          <h5><label htmlFor="inputEmail4">Event Name</label></h5>
          <input
            type="text"
            value={props.eventName}
            onChange={props.onChange}
            name="eventName"
            className="form-control form-control-lg"
            required
          />
        </div>

        <div className="form-group col-md-6">
          <h5><label htmlFor="inputPassword4">Date</label></h5>
          <input
            type="date"
            value={props.eventdate}
            onChange={props.onChange}
            name="eventdate"
            className="form-control form-control-lg"
            required
          />
        </div>

        <div className="form-group col-md-6">
          <h5><label htmlFor="inputPassword4">Time</label></h5>
          <input
            type="time"
            value={props.time}
            onChange={props.onChange}
            name="time"
            className="form-control form-control-lg"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <h5><label htmlFor="exampleFormControlTextarea1">purpose</label></h5>
        <textarea
          className="form-control"
          value={props.purpose}
          onChange={props.onChange}
          name="purpose"
          rows="3"
          placeholder="Tell people more about the event"
        />
      </div>


      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
             Pick Center
      </button>

      <div
        className="modal fade bd-example-modal-lg"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >

        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <PickCenter />
          </div>
        </div>
      </div>
      <br />
      <br />
      <button type="submit" className="btn btn-primary btn-lg">Submit</button>
    </form>
  </div>

);

export default eventForm;

