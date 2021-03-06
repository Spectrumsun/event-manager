/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {checkAdminHoc} from '../../static/js/validator';
import {withRouter} from "react-router-dom";


export default function (ComposedComponent) {
  /**
 * @class IsAdmin
 *
 * @extends {React.Component}
 */
  class IsAdmin extends Component {
  /**
   * @description run action on component verify if user is Admin
   *
   * @param {any} props.params.token
   *
   * @memberof Signup
   */
      componentWillMount(){
          if(!this.props.auth.isAuthenticated || this.props.auth.user.role !== process.env.VALUE){
           this.props.history.push("/")
           checkAdminHoc();
          }
      }
    render() {
      return (
       <ComposedComponent {...this.props}/>
      );
    }
  }
    const mapStateToProps = state => ({
    auth: state.auth
})

    return withRouter(
      connect(mapStateToProps)
      (IsAdmin)
    );
}


