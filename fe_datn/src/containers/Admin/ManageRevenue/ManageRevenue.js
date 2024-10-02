/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import TransactionChart from './TransactionChart';

class ManageRevenue extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      render() {
            return (
                  <div className="flex">
                        <div className='title text-center'>
                              <h1>Revenue Informations</h1>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                              <div className="bg-gray-500">01</div>
                              <div>09</div>
                        </div>

                        <TransactionChart />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageRevenue);
