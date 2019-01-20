import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';

import AppMetaTags from 'src/app/components/AppMetaTags/AppMetaTags';

class Container extends Component {
	constructor(props) {
		super(props);
		this.props.checkPagePath(this.props.match.path);
	}

	render() {
		const {
			title
		} = this.props;

		return (
			<React.Fragment>
				<AppMetaTags title={title || "IQM Suite"}/>
				{this.props.children}
			</React.Fragment>
		);
	}
}

export default connect(
	state => ({
		appStore: state
	}),
	dispatch => ({
		checkPagePath: (path) => {
			dispatch({type: 'PAGE_PATH', payload: path})
		}
	})
)(withRouter(Container));