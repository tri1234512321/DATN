/** @format */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";
import { path } from "../utils";
//////////////////////
//End Component management of Shop
import Home from "../containers/Pages/Home";
import PageNotFound from "../containers/Pages/PageNotFound";
import Login from "../containers/Auth/Login";
import ShoppingCart from "../containers/Pages/ShoppingCart/ShoppingCart";

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
          <div className='main-container'>
            {/* {this.props.isLoggedIn && <Header />} */}

            <div className='content-container'>
              <Switch>
                {/*page  khu A */}
                <Route path={"/"} exact component={Home}></Route>
                {/* ------------------------------- */}
                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                {/* ------------------------------- */}
                {/* router page not found */}
                <Route path={"/page-not-found"} exact component={PageNotFound} />
                <Route path={"/shopping-cart"} exact component={ShoppingCart} />
              </Switch>
            </div>

            <ToastContainer
              position='bottom-right'
              autoClose={5000}
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
