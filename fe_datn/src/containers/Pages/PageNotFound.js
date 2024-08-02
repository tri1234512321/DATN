/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Fragment } from "react";
class PageNotFound extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      goHome() {
            const { navigate, userInfo } = this.props;
            const roleId = userInfo.data.user.roleId;
            if (roleId === "ADMIN") {
                  navigate("/admin");
            } else if (roleId === "SHOP") {
                  navigate("/shop");
            } else if (roleId === "SHIPPER") {
                  navigate("/shipper");
            } else {
                  navigate("/");
            }
      }
      render() {
            return (
                  <Fragment>
                        <div style={{ margin: "100px 100px" }}>
                              <h1>Page not found</h1>
                              <button onClick={() => this.goHome()}>Back to home</button>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
