import React, {Component} from "react";
import {withRouter, NavLink, Route} from "react-router-dom";
import {connect} from "react-redux";

import {Content} from "src/app/components/Content";

import {COMPONENTS, PAGES, ADMIN_PAGES} from "src/app/consts";

class HeaderItem extends Component {
    constructor(props) {
        super();
        this.pageIsLoaded = false;
    }

	pageIsActive(path) {
    	let pagePath = this.props.location.pathname;
    	if(pagePath !== "/") {
			pagePath = pagePath.replace(/\/$/, "");
		}
        const isActive = path === pagePath;

        if(!this.pageIsLoaded && isActive) {
            this.pageIsLoaded = true;
        }

		return isActive;
	}

    render() {
        const {
        	index,
        	path,
			isAdminPages,
			children
        } = this.props;

        const {
            lang
        } = this.props.appStore;

        let pages = !isAdminPages ? PAGES : ADMIN_PAGES;

        const title = pages[path].title[lang];

        const pageIsActive = this.pageIsActive(path);

        return (
			!isAdminPages
                ?
                <div className={`nav__item ${pageIsActive ? "_active" : ""}`}>
                    <div className="nav__item-wrapper">
                        <NavLink
                            className="nav__link"
                            exact
                            activeClassName="_active"
                            to={path}
                        >
                            {title}
                        </NavLink>
                    </div>
					{(pageIsActive || this.pageIsLoaded) &&
                        <div className="nav__content">
                            <Content pageTitle={title}>
								{React.createElement(COMPONENTS[index], {path: path})}
                            </Content>
                        </div>
					}
                </div>
                :
                <div className="nav__item _active">
                    <div className="nav__item-wrapper">
                        <div className="nav__link _active">
                            {title}
                        </div>
                    </div>
                    <div className="nav__content">
                        {children}
                    </div>
                </div>
        );
    }
}

export default withRouter(
	connect(
		state => ({
			appStore: state
		})
)(HeaderItem));