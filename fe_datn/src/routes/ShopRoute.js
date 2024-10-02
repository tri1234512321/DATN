/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeShop from "../containers/Shop/HomeShop/HomeShop";
import ManageActivityShop from "../containers/Shop/ManageActivityShop/ManageActivityShop";
import ManageFood from "../containers/Shop/ManageFood/ManageFood";
import ManageOrderDelivered from "../containers/Shop/ManageOrder/ManageOrderDelivered/ManageOrderDelivered";
import ManageOrderDelivering from "../containers/Shop/ManageOrder/ManageOrderDelivering/ManageOrderDelivering";
import ManageOrderReturned from "../containers/Shop/ManageOrder/ManageOrderReturned/ManageOrderReturned";
import ManageOrdered from "../containers/Shop/ManageOrder/ManageOrdered/ManageOrdered";
import ManageRevenue from "../containers/Shop/ManageRevenue/ManageRevenue";

class ShopRoute extends Component {
      render() {
            const { systemMenuPath /*isLoggedIn*/ } = this.props;
            return (
                  <React.Fragment>
                        <div className='system-container'>
                              <div className='system-list'>
                                    <Switch>
                                          <Route path='/shop/home-shop' component={HomeShop} />
                                          <Route path='/shop/management-activity' component={ManageActivityShop} />
                                          <Route path='/shop/management-foods' component={ManageFood} />
                                          <Route path='/shop/management-ordered' component={ManageOrdered} />
                                          <Route path='/shop/order-delivered' component={ManageOrderDelivered} />
                                          <Route path='/shop/order-delivering' component={ManageOrderDelivering} />
                                          <Route path='/shop/order-returned' component={ManageOrderReturned} />
                                          <Route path='/shop/management-revenue' component={ManageRevenue} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopRoute);
