import React from 'react';
import { NavLink } from 'react-router-dom';

import { Content } from './Content';

import { PAGES, COMPONENTS } from './../constants';

export class HeaderItem extends React.Component {
    constructor(props) {
        super();
        this.path = props.routePath;
        this.content = props.children;
        this.page = props.pageTitle;
        this.components = COMPONENTS;
        this.pages = PAGES;
        this.index = this.pages.indexOf(this.page);
        this.updateDocumentTitle = props.updateDocumentTitle;

        this.state = {
            isActive: this.path === window.location.pathname
        };
    }

    componentDidUpdate() {
        //to change page title if this component is active
        if(this.path === window.location.pathname) {
            this.updateDocumentTitle(this.page);
        }
        this.saveRouteComponent();
    }

    isActive() {
        return this.path === window.location.pathname;
    }

    saveRouteComponent() {
        if(this.state.isActive || this.path !== window.location.pathname) return;
        //once opened route get 'isActive' state and its content will not removed when this route is deactivated
        this.setState({ isActive: true });
    }

    render() {
        return (
            <div className={"nav__item " + (this.isActive() ? "_active" : "")}>
                <div className="nav__item-wrapper">
                    <NavLink className="nav__link" exact activeClassName="_active" to={this.path}>
                        {this.page}
                    </NavLink>
                </div>
                {(this.isActive() || this.state.isActive) &&
                <div className="nav__content">
                    <Content pageTitle={this.page}>
                        {this.state.isActive ? React.createElement(this.components[this.index], { isActive: this.state.isActive }) : this.content}
                    </Content>
                </div>
                }
            </div>
        );
    }
}