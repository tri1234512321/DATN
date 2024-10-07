/** @format */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";

//Begin Component management of admin
import Admin from "../containers/Admin/Admin";
//End Component management of admin
//----------------------------------------------------------------
//Begin Component management of Shop
import Shop from "../containers/Shop/Shop";
//End Component management of Shop
//Begin Component management of Shop
import Shipper from "../containers/Shipper/Shipper";
//////////////////////
import Home from "../containers/Pages/Home";
import PageNotFound from "../containers/Pages/PageNotFound";
import Login from "../containers/Auth/Login";
import ShoppingCart from "../containers/Pages/ShoppingCart/ShoppingCart";
import FoodItem from "../components/ItemFood/Detail/FoodItem";
import ShopDetail from "../containers/Pages/Shop/ShopDetail";
import Social from "../containers/Social/Social";
import Payment from "../containers/Pages/Payment/Payment";
import HistoryOrder from "../containers/Pages/OrderHistory/OrderHistory";
import Register from "../containers/Auth/Register";
import ShoppingList from "../containers/Pages/ListProduct/ListProduct";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* {this.props.isLoggedIn && <Header />} */}

            <div className="content-container">
              <Switch>
                {/*page  khu A */}
                <Route path={"/"} exact component={Home}></Route>
                {/* ------------------------------- */}
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={"/register"}
                  component={userIsNotAuthenticated(Register)}
                />
                {/* ------------------------------- */}
                {/* ------------------------------- */}
                <Route path={"/admin"} component={userIsAuthenticated(Admin)} />
                {/* ------------------------------- */}
                <Route path={"/shop"} component={userIsAuthenticated(Shop)} />
                {/* ------------------------------- */}
                <Route
                  path={"/shipper"}
                  component={userIsAuthenticated(Shipper)}
                />
                <Route path={"/social"} component={Social} />
                {/* router page not found */}
                <Route path={"/shopping-cart"} exact component={ShoppingCart} />
                <Route path={"/food/:id"} exact component={FoodItem} />
                <Route path={"/shop-details/:id"} exact component = {ShopDetail} />
                <Route
                  path={"/page-not-found"}
                  exact
                  component={PageNotFound}
                />
                <Route path={"/shopping-cart"} exact component={ShoppingCart} />
                <Route path={"/food/:id"} exact component={FoodItem} />
                <Route path={"/shop-details/:id"} exact component={ShopDetail} />
                <Route path={"/payment"} exact component={Payment}/>
                <Route path={"/history-order"} exact component={HistoryOrder}/>
                <Route path={"/product-list"} exact component={ShoppingList}/>
              </Switch>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newsOpTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
