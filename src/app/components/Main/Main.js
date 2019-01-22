import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import HeaderItem from "src/app/components/HeaderItem/HeaderItem";
import Admin from "src/app/components/Admin/Admin";

import {PATHS, ADMIN_PATHS} from "src/app/consts";

class Main extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			pagePath
		} = this.props.appStore;

		// const isAdminPage = /^\/admin(.*)$/.test(pagePath);

		let trimmedPagePath = pagePath;
		if(trimmedPagePath !== "/") {
			trimmedPagePath = trimmedPagePath.replace(/\/$/, "");
		}

		const isAdminPage = ADMIN_PATHS.indexOf(trimmedPagePath) !== -1;

		return (
			<header className="header">
				<nav className="nav">
					<div className="nav__list">
						{!isAdminPage ?
							PATHS.map((path, i) => <HeaderItem key={i} index={i} path={path}/>)
							:
							<Admin/>
						}
					</div>
				</nav>
			</header>
		)
	}
}

export default withRouter(
	connect(
		state => ({
			appStore: state
		})
)(Main));