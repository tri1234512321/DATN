/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import ShipperRoute from "../../routes/ShipperRoute";
import HeaderSystem from "../../components/HeaderSystem/HeaderSystem";
import { Fragment } from "react";
class Shipper extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      componentDidMount() {
            console.log("this.props.userInfo.data.user.roleId: ", this.props.userInfo.data.user.roleId);
            if (this.props.userInfo.data.user.roleId !== "SHIPPER") {
                  const { navigate } = this.props;
                  navigate("/page-not-found");
            }
      }
      render() {
            return (
                  <Fragment>
                        {this.props.isLoggedIn && <HeaderSystem />}
                        <ShipperRoute />
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

export default connect(mapStateToProps, mapDispatchToProps)(Shipper);
