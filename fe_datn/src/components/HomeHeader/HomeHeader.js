/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { push } from "connected-react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
// MUI
import { faBars, faCartShopping, faHeart, faGift, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./HomeHeader.scss";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 0,
      expended: false,
      anchorEl: null,
      cartCount: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Kiểm tra nếu allCart có thay đổi
    if (prevProps.allCart !== this.props.allCart) {
      // Cập nhật số lượng giỏ hàng trong state
      this.setState({ cartCount: this.props.allCart.length });
    }
  }

  async componentDidMount() {
    this.state.cartCount = this.props.allCart.length;
    let access_token = this.props.userInfo.data.access_token;
    await this.props.getAllCart(access_token);
    window.addEventListener("scroll", this.handleScroll);
  }
  openSettingUser = (event) => {
    console.log("event: " + event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  // toggleMenu = () => {
  //   this.setState({
  //     expended: !this.state.expended,
  //   });
  // };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    this.setState({
      scrollY: window.scrollY,
    });
  }

  navigateGift = () => {
    console.log("navigateGift");
  };

  navigateHeart = () => {
    console.log("navigateHeart");
  };

  navigateShoppingCart = () => {
    const { navigate } = this.props;
    const redirectPath = "/shopping-cart";
    navigate(`${redirectPath}`);
  };

  processLogin = () => {
    console.log("check login");
    const { navigate } = this.props;
    const redirectPath = "/login";
    navigate(`${redirectPath}`);
  };

  navigateLogout = () => {
    this.props.processLogout();
    const { navigate } = this.props;
    const redirectPath = "/login";
    navigate(`${redirectPath}`);
  };

  render() {
    const scrollY = this.state.scrollY;
    const user = this.props.userInfo;
    const leftItem = [
      {
        icon: faGift,
        func: this.navigateGift,
      },
      {
        icon: faCartShopping,
        func: this.navigateShoppingCart,
        value: this.state.cartCount,
      },
      {
        icon: faHeart,
        func: this.navigateHeart,
      },
      {
        icon: faUser,
        func: this.openSettingUser,
      },
    ];
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log("this.testAmount: ", this.state.cartCount);
    return (
      <React.Fragment>
        <NavigationMenu isOpen={this.state.expended} toggleMenu={this.toggleMenu} />
        <header className='main-header'>
          <div className={`wrap-header ${scrollY === 0 ? "bg-transparent" : ""}`}>
            <div className='header-container row'>
              <div className='left-header col-3 d-flex'>
                <div className='wrap-icon-bars-header col-2'>
                  <FontAwesomeIcon size='lg' className='icon-bars-header' icon={faBars} onClick={this.toggleMenu} />
                </div>
                <div className='wrap-logo-ffood col-6'>
                  <div className='logo-ffood col-4'></div>
                  <div className='trademark col-8 primary-text'>FFOOD</div>
                </div>
                <div className='area col-4'></div>
              </div>
              <div className='mid-header col-7'>
                <div className='wrap-search-header text-input-placeholder'>
                  <input type='text' className='search-header' placeholder='Tìm kiếm với FFOOD'></input>
                  <label className={`lable-search-header primary-text ${scrollY === 0 ? "bg-transparent" : ""}`}>
                    Tìm kiếm với FFOOD
                  </label>
                  <div className='wrap-icon-search-header'>
                    <FontAwesomeIcon className='icon-search-header' icon={faMagnifyingGlass} />
                  </div>
                </div>
              </div>
              <div className='right-header col-2'>
                {user ? (
                  <div className='d-flex'>
                    {leftItem.map((item, index) => (
                      <div key={index} className='right-item-header m-3'>
                        <Button
                          aria-controls={item.hover ? "simple-menu" : undefined}
                          aria-haspopup={item.hover ? "true" : undefined}
                          onMouseEnter={item.hover ? this.handleHover : undefined}
                          onClick={item.func ? item.func : undefined}
                        >
                          <FontAwesomeIcon
                            size='2x'
                            icon={item.icon}
                            className={`icon-right-header ${
                              scrollY === 0 ? "text-[#fff] box-shadown-#ff5f29" : "text-[#f63635]"
                            }`}
                          />
                          <div className='right-items-value'>{item.value || 0}</div>
                        </Button>
                        <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={open} onClose={this.handleClose}>
                          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                          <MenuItem onClick={this.handleClose}>My account</MenuItem>
                          <MenuItem onClick={this.navigateLogout}>Logout</MenuItem>
                        </Menu>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='sigup-login'>
                    <button className='btn-login primary-text' onClick={this.processLogin}>
                      <FontAwesomeIcon className='icon-users' icon={faUser} />
                      <span className='text-login'>Log in</span>
                    </button>
                    <button className='btn-sigup'>Sign up</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
    allCart: state.buyer.allCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    processLogout: () => dispatch(actions.processLogout()),
    getAllCart: (access_token) => dispatch(actions.fetchAllCartStart(access_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
