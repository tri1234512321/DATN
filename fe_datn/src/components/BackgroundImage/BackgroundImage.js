/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader/HomeHeader";
import Banner from "../Banner/Banner.jsx";
import "./BackgroundImage.scss";
import * as actions from "../../store/actions";
class BackgroundImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='wrap-background-image'>
        <div className='background-image'>
          <HomeHeader />
          <Banner />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
    allCart: state.buyer.allCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCart: (access_token) => dispatch(actions.fetchAllCartStart(access_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundImage);
