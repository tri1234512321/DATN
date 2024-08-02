/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage";
import { Fragment } from "react";

class DrinkPage extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }

      async componentDidMount() {}

      render() {
            const linkNameArea = window.location.pathname.split("/")[1];
            console.log("linkNameArea: ", linkNameArea);
            const linkNameTypeFood = window.location.pathname.split("/")[2];

            return (
                  <Fragment>
                        <BackgroundImage linkNameTypeFood={linkNameTypeFood} linkNameArea={"/" + linkNameArea} />
                  </Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {};
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrinkPage);
