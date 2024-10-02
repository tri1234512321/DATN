/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageAllUser from "../containers/Admin/ManageMember/ManageAllUser/ManageAllUser";
import ManageBuyer from "../containers/Admin/ManageMember/ManageBuyer/ManageBuyer";
import ManageShipper from "../containers/Admin/ManageMember/ManageShipper/ManageShipper";
import ManageShop from "../containers/Admin/ManageMember/ManageShop/ManageShop";
import ManageActivityShipper from "../containers/Admin/ManageActivityShipper/ManageActivityShipper";
import ManageActivityShop from "../containers/Admin/ManageActivityShop/ManageActivityShop";
import ManageJob from "../containers/Admin/ManageJob/ManageJob";
import ManageStaff from "../containers/Admin/ManageStaff/ManageStaff";
import ManageRevenue from "../containers/Admin/ManageRevenue/ManageRevenue";
import ManageRevenueShop from "../containers/Admin/ManageRevenue/ManageRevenueShop";

// import CrudRedux from "../containers/Admin/CrudUsers/CrudRedux";

import PageNotFound from "../containers/Pages/PageNotFound";
class AdminRoute extends Component {
      render() {
            const { systemMenuPath /*isLoggedIn*/ } = this.props;
            return (
                  <React.Fragment>
                        <div className='system-container'>
                              <div className='system-list'>
                                    <Switch>
                                          <Route path='/admin/management-all-users' component={ManageAllUser} />
                                          <Route path='/admin/manage-shop' component={ManageShop} />
                                          <Route path='/admin/manage-shipper' component={ManageShipper} />
                                          <Route path='/admin/manage-buyers' component={ManageBuyer} />
                                          <Route path='/admin/manage-activity-shop' component={ManageActivityShop} />
                                          <Route
                                                path='/admin/manage-activity-shipper'
                                                component={ManageActivityShipper}
                                          />
                                          <Route path='/admin/manage-job' component={ManageJob} />
                                          <Route path='/admin/manage-staff' component={ManageStaff} />
                                          <Route path='/admin/manage-revenue' exact component={ManageRevenue} />
                                          <Route
                                                path='/admin/manage-revenue-shop'
                                                exact
                                                component={ManageRevenueShop}
                                          />
                                          {/* <Route
                                                component={() => {
                                                      return <Redirect to={"/admin"} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);
