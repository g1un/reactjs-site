import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from "react-redux";

import { Content } from './Content';

import { COMPONENTS, __PAGES, PATHS } from './../constants';

class HeaderItem extends React.Component {
    constructor(props) {
        super();
    }

    isActive(path) {
        return path === window.location.pathname;
    }

    render() {
		const {
			index
		} = this.props;
		const path = PATHS[index];
		const title = __PAGES[path].title["en"];
        return (
            this.props.pageTitle !== 'Admin'
                ?
                <div className={"nav__item " + (this.isActive(path) ? "_active" : "")}>
                    <div className="nav__item-wrapper">
                        <NavLink className="nav__link" exact activeClassName="_active" to={path}>
                            {title}
                        </NavLink>
                    </div>
                    {(this.isActive(path)) &&
                    <div className="nav__content">
                        <Content pageTitle={title}>
                            {React.createElement(
								COMPONENTS[this.props.index],
								{
									isActive: false,
									lang: "en",
									pageTitle: this.props.pageTitle
								}
							)}
                        </Content>
                    </div>
                    }
                </div>
                :
                <div className="nav__item _active">
                    <div className="nav__item-wrapper">
                        <div className="nav__link _active">
                            {this.props.pageTitle}
                        </div>
                    </div>
                    <div className="nav__content">
                        {this.content}
                    </div>
                </div>
        );
    }
}

// export default HeaderItem;

export default withRouter(
	connect(
		state => ({
			appStore: state
		}),
		dispatch => ({
			setPagePath: (path) => {
				dispatch({type: "PAGE_PATH", payload: path})
			},
			setPageTitle: (title) => {
				dispatch({type: "PAGE_TITLE", payload: title})
			}
		})
	)(HeaderItem)
);