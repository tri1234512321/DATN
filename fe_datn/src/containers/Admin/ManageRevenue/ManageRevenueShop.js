/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
class ManageRevenueShop extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      render() {
            return (
                  <div>
                        <h1>Manage Revenue Shop</h1>
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {};
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRevenueShop);
