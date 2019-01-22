import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import "src/scss/style.scss";

import Main from "src/app/components/Main/Main";
import AppMetaTags from "src/app/components/AppMetaTags/AppMetaTags";
import {NotFound} from "src/app/components/NotFound";
import LangComponent from "src/app/components/Lang/Lang";

import {ALL_PATHS, PAGES, ADMIN_PAGES, SITE_TITLE} from "src/app/consts";

class Site extends Component {
	componentDidMount() {
		const {
			setPageTitle
		} = this.props;

		const {
			pagePath,
			lang
		} = this.props.appStore;

		let trimmedPagePath = pagePath;
		if(trimmedPagePath !== "/") {
			trimmedPagePath = trimmedPagePath.replace(/\/$/, "");
		}

		let allPages = {
			...PAGES,
			...ADMIN_PAGES
		};

		const title = allPages[trimmedPagePath] && allPages[trimmedPagePath].title[lang];

		setPageTitle(title);
	}

    render() {
        const {
            pageTitle,
            lang
        } = this.props.appStore;

        const siteTitle = (pageTitle ? `${pageTitle} | ` : "") + SITE_TITLE[lang];

        return (
            <Router>
                <div className="container">
                    <AppMetaTags title={siteTitle}/>
                    <LangComponent/>
                    <Switch>
                        {ALL_PATHS.map((path, i) => {
                            return <Route key={i} exact path={path}/>;
                        })}
                        <Route render={() => <NotFound text="Error 404"/>}/>
                    </Switch>
                    <Main/>
                    <Switch>
                        {ALL_PATHS.map((path, i) => {
                            return <Route key={i} exact path={path}/>;
                        })}
                        <Route render={() => <NotFound text="Page not found"/>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default connect(
    state => ({
        appStore: state
    }),
	dispatch => ({
		setPageTitle: (title) => {
			dispatch({type: 'PAGE_TITLE', payload: title})
		}
	})
)(Site);