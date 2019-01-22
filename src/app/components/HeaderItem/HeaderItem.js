import React, {Component} from "react";
import {withRouter, NavLink, Route} from "react-router-dom";
import {connect} from "react-redux";

import {Content} from "src/app/components/Content";

import {COMPONENTS, PAGES, ADMIN_PAGES} from "src/app/consts";

class HeaderItem extends Component {
    constructor(props) {
        super();
        this.pageIsLoaded = false;
        this.pageIsActive = false;
    }

	componentDidUpdate() {
    	const {
    		setPageTitle
		} = this.props;

    	const {
    		pageTitle
		} = this.props.appStore;

		if(this.pageIsActive && (this.title !== pageTitle)) {
			setPageTitle(this.title);
		}
	}

	ifPageIsActive(path) {
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

        this.pages = !isAdminPages ? PAGES : ADMIN_PAGES;
        this.title = this.pages[path].title[lang];
        this.pageIsActive = this.ifPageIsActive(path);

        return (
			!isAdminPages
                ?
                <div className={`nav__item ${this.pageIsActive ? "_active" : ""}`}>
                    <div className="nav__item-wrapper">
                        <NavLink
                            className="nav__link"
                            exact
                            activeClassName="_active"
                            to={path}
                        >
                            {this.title}
                        </NavLink>
                    </div>
					{(this.pageIsActive || this.pageIsLoaded) &&
                        <div className="nav__content">
                            <Content pageTitle={this.title}>
								{React.createElement(COMPONENTS[index], {path: path})}
                            </Content>
                        </div>
					}
                </div>
                :
                <div className="nav__item _active">
                    <div className="nav__item-wrapper">
                        <div className="nav__link _active">
                            {this.title}
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
		}),
		dispatch => ({
			setPageTitle: (title) => {
				dispatch({type: 'PAGE_TITLE', payload: title})
			}
		})
)(HeaderItem));