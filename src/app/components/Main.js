import React, {Component} from "react";
import {withRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import "src/scss/style.scss";

import Main1 from "src/app/components/Main/Main";
import AppMetaTags from "src/app/components/AppMetaTags/AppMetaTags";
import {NotFound} from "src/app/components/NotFound";
import LangComponent from "src/app/components/Lang/Lang";

import {ALL_PATHS, PAGES, SITE_TITLE} from "src/app/consts";

class Main extends Component {
    render() {
        const {
            pagePath,
            lang
        } = this.props.appStore;

        let trimmedPagePath = pagePath;
        if(trimmedPagePath !== "/") {
			trimmedPagePath = trimmedPagePath.replace(/\/$/, "");
		}
        const title = PAGES[trimmedPagePath] && PAGES[trimmedPagePath].title[lang];
        const siteTitle = (title ? `${title} | ` : "") + SITE_TITLE[lang];

        return (
            <div className="container">
                <AppMetaTags title={siteTitle}/>
                <LangComponent/>
                <Switch>
                    {ALL_PATHS.map((path, i) => {
                        return <Route key={i} exact path={path}/>;
                    })}
                    <Route render={() => <NotFound text="Error 404"/>}/>
                </Switch>
                <Main1/>
                <Switch>
                    {ALL_PATHS.map((path, i) => {
                        return <Route key={i} exact path={path}/>;
                    })}
                    <Route render={() => <NotFound text="Page not found"/>}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(
    connect(
        state => ({
            appStore: state
        })
)(Main));