/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Fragment } from "react";
import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage";

class VegetablePage extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }

      async componentDidMount() {}

      render() {
            const linkNameArea = window.location.pathname.split("/")[1];

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

export default connect(mapStateToProps, mapDispatchToProps)(VegetablePage);
