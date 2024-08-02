/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Fragment } from "react";

class CustomTable extends Component {
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
                        <div
                              className='wrap-custom-table'
                              style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "red",
                                    position: "absolute",
                                    top: "500px",
                                    right: "500px",
                              }}
                        >
                              custome table
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);
