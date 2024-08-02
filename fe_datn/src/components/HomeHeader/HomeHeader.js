/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { push } from "connected-react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import NavigationMenu from "./NavigationMenu/NavigationMenu";

import "./HomeHeader.scss";
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: 0,
            expended: false,
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    toggleMenu = () => {
        this.setState({
            expended: !this.state.expended,
        });
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll(event) {
        this.setState({
            scrollY: window.scrollY,
        });
    }
    // wrapNotifycation = () => {
    //       return (
    //             <div className={`wrap-notifycation active`}>
    //                   <div className='content-notifycation'>
    //                         <div className='close-notifycation'>
    //                               <img
    //                                     className='icon-close'
    //                                     src={XSymbol}
    //                                     alt='close-notifycation'
    //                                     onClick={() =>
    //                                           this.setState({ isOpenNotifycation: !this.state.isOpenNotifycation })
    //                                     }
    //                               ></img>
    //                         </div>
    //                         <div className='wrap-tostify'>
    //                               <div className='wrap-content'>
    //                                     <div className='item-content'>tostify 1</div>
    //                               </div>
    //                               <div className={`line ${this.state.isOpenNotifycation ? "active" : null}`}></div>
    //                         </div>
    //                   </div>
    //             </div>
    //       );
    // };
    // addWrapNotifycation = () => {
    //       this.setState({
    //             listWrapNotifycation: this.state.listWrapNotifycation.concat(
    //                   <this.wrapNotifycation key={this.state.listWrapNotifycation.length} />,
    //             ),
    //       });
    // };
    // tostify = () => {
    //       this.setState({
    //             isOpenCoverNotify: !this.state.isOpenCoverNotify,
    //       });
    // };
    // handleRouterArea = (area) => {
    //       console.log("area: " + area);
    //       this.setState({
    //             linkAreaCurrent: area,
    //       });
    //       this.navigateArea(area);
    // };

    processLogin = () => {
        const { navigate } = this.props;
        const redirectPath = "/login";
        navigate(`${redirectPath}`);
    };
    navigateLogin = () => {
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
        let scrollY = this.state.scrollY;
        console.log("this.state.scrollY: ", scrollY);
        return (
            <React.Fragment>
                <NavigationMenu isOpen={this.state.expended} toggleMenu={this.toggleMenu} />
                <header className='main-header'>
                    <div className={`wrap-header ${scrollY === 0 ? "bg-transparent" : ""}`}>
                        <div className='header-container row'>
                            <div className='left-header col-3 d-flex'>
                                <div class='wrap-icon-bars-header col-2'>
                                    <FontAwesomeIcon
                                        className='icon-bars-header'
                                        icon={icon({ name: "bars" })}
                                        onClick={() => this.toggleMenu()}
                                    />
                                </div>
                                <div className='wrap-logo-ffood col-6'>
                                    <div className='logo-ffood col-4'></div>
                                    <div className='trademark col-8 primary-text'>FFOOD</div>
                                </div>
                                <div className='area col-4'></div>
                            </div>
                            <div className='mid-header col-7'>
                                <div className='wrap-search-header text-input-placeholder'>
                                    <input
                                        type='text'
                                        className='search-header'
                                        placeholder='Tìm kiếm với FFOOD'
                                    ></input>
                                    <label
                                        className={`lable-search-header primary-text ${
                                            scrollY === 0 ? "bg-transparent" : ""
                                        }`}
                                    >
                                        Tìm kiếm với FFOOD
                                    </label>
                                    <div className='wrap-icon-search-header'>
                                        <FontAwesomeIcon
                                            className='icon-search-header'
                                            icon={icon({ name: "magnifying-glass" })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='right-header col-2'>
                                <div className='sigup-login'>
                                    <button className='btn-login primary-text'>
                                        <FontAwesomeIcon className='icon-users' icon={icon({ name: "user" })} />
                                        <span className='text-login'>Log in</span>
                                    </button>
                                    <button className='btn-sigup'>Sign up</button>
                                </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
