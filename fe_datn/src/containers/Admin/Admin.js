/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import ManageAllUser from "./ManageMember/ManageAllUser/ManageAllUser";
import "./TableUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import HeaderSystem from "../../components/HeaderSystem/HeaderSystem";
import AdminRoute from "../../routes/adminRoute";
import { Fragment } from "react";
class Admin extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      componentDidMount() {
            const { navigate } = this.props;
            if (this.props.userInfo.data.user.roleId !== "ADMIN") {
                  navigate("/page-not-found");
            }
            // else {
            //       navigate("/admin");
            // }
      }
      render() {
            return (
                  <Fragment>
                        {this.props.isLoggedIn && <HeaderSystem />}
                        <div className='users-container mx-4'>
                              <AdminRoute />
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
