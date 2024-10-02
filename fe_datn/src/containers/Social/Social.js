/** @format */

import React, { Component } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import SocialRoute from "../../routes/SocialRoute";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import { Fragment } from "react";
class Social extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		console.log("this.props.userInfo.data.user: ", this.props.userInfo);
		if (this.props.userInfo.data.user === undefined) {
			const { navigate } = this.props;
			navigate("/page-not-found");
		}
	}
	render() {
		return (
			<Fragment>
				{this.props.isLoggedIn && <HomeHeader/>}
				<SocialRoute />
			</Fragment>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Social);
