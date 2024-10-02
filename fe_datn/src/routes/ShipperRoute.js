/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageOrderDelivered from "../containers/Shipper/ManageContainerOrder/ManageOrderDelivered/ManageOrderDelivered";
import ManageOrderDelivering from "../containers/Shipper/ManageContainerOrder/ManageOrderDelivering/ManageOrderDelivering";
import ManageOrderReturned from "../containers/Shipper/ManageContainerOrder/ManageOrderReturned/ManageOrderReturned";
import ManageOrderOfShop from "../containers/Shipper/ManageOrderOfShop/ManageOrderOfShop";
import ManageSalary from "../containers/Shipper/ManageSalary/ManageSalary";
import ManageSchedule from "../containers/Shipper/ManageSchedule/ManageSchedule";
import RegisterJob from "../containers/Shipper/RegisterJob/RegisterJob";
import HomeShipper from "../containers/Shipper/HomeShipper/HomeShipper";
class ShipperRoute extends Component {
      render() {
            const { systemMenuPath /*isLoggedIn*/ } = this.props;
            return (
                  <React.Fragment>
                        <div className='system-container'>
                              <div className='system-list'>
                                    <Switch>
                                          <Route path='/shipper/home-shipper' component={HomeShipper} />

                                          <Route path='/shipper/management-register-jobs' component={RegisterJob} />
                                          <Route path='/shipper/management-schedule-jobs' component={ManageSchedule} />
                                          <Route
                                                path='/shipper/management-order-of-shop'
                                                component={ManageOrderOfShop}
                                          />
                                          <Route
                                                path='/shipper/management-order-delivering'
                                                component={ManageOrderDelivering}
                                          />
                                          <Route
                                                path='/shipper/management-order-delivered'
                                                component={ManageOrderDelivered}
                                          />
                                          <Route
                                                path='/shipper/management-order-returned'
                                                component={ManageOrderReturned}
                                          />
                                          <Route path='/shipper/management-salary' component={ManageSalary} />
                                          {/* <Route
                                                component={() => {
                                                      return <Redirect to={"/shipper"} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ShipperRoute);
