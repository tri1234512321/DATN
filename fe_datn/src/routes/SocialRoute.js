/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeSocial from "../containers/Social/home/Home";
import Profile from "../containers/Social/profile/Profile";
import Search from "../containers/Social/search/Search";
import Friend from "../containers/Social/friend/Friend";

class SocialRoute extends Component {
  render() {
    const { systemMenuPath /*isLoggedIn*/ } = this.props;
    return (
      <React.Fragment>
        <div className='system-container'>
          <div className='system-list'>
            <Switch>
              <Route path='/social/social-home' component={HomeSocial} />
              <Route path='/social/profile' component={Profile} />
              <Route path='/social/search' component={Search} />
              <Route path='/social/friend' component={Friend} />
              {/* <Route
                    component={() => {
                          return <Redirect to={"/shop"} />;
                    }}
              /> */}
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
      return {
            systemMenuPath: state.app.systemMenuPath,
            isLoggedIn: state.user.isLoggedIn,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialRoute);
