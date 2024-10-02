/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Fragment } from "react";
class ManageRevenue extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      render() {
            return (
                  <Fragment>
                        <div className='users-container mx-4'>Manage Revenue</div>
                  </Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            isLoggedIn: state.user.isLoggedIn,
            lang: state.app.language,
            userInfo: state.user.userInfo,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            navigate: (path) => dispatch(push(path)),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRevenue);
