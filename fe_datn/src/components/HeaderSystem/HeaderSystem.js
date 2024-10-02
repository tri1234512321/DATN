/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../Navigator";
import { adminMenu, shopMenu, shipperMenu } from "./menuApp";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import "./HeaderSystem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Notifications from "../Notification/Notifications";

class HeaderSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  componentDidMount() {
    let { userInfo, isLoggedIn } = this.props;
    // console.log("userInfo: ", userInfo);
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.data.user.roleId;
      // console.log("isLoggedIn : ", isLoggedIn);
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role === USER_ROLE.SHOP) {
        menu = shopMenu;
      } else if (role === USER_ROLE.SHIPPER) {
        menu = shipperMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    const userInfo = this.props.userInfo;
    const { processLogout, lang } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="wrap">
          <Notifications/>
          <div className="welcome">
            <span>
              <FormattedMessage id={"homeheader.welcome"} />,
              {userInfo &&
              userInfo.data &&
              userInfo.data.user &&
              userInfo.data.user.firstName
                ? userInfo.data.user.firstName + " !"
                : ""}
            </span>
          </div>
          <div className="language">
            <span
              className={
                lang === LANGUAGES.VI ? "language-vi action" : "language-vi"
              }
              onClick={() => {
                this.handleChangeLanguage(LANGUAGES.VI);
              }}
            >
              VN
            </span>
          </div>
          <div className="language">
            <span
              className={
                lang === LANGUAGES.EN ? "language-en action" : "language-en"
              }
              onClick={() => {
                this.handleChangeLanguage(LANGUAGES.EN);
              }}
            >
              EN
            </span>
          </div>
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <FontAwesomeIcon icon={icon({ name: "right-from-bracket" })} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSystem);
