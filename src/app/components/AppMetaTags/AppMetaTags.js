import React, {Component} from "react";
import MetaTags from "react-meta-tags";

class AppMetaTags extends Component {
	render() {
		const {
			title
		} = this.props;

		return (
			<MetaTags>
				<title>
					{title}
				</title>
			</MetaTags>
		)
	}
}

export default AppMetaTags