import React from 'react';
import { NavLink } from 'react-router-dom';

import { Content } from './Content';
import { About } from './About';
import { Works } from './Works';
import { Contacts } from './Contacts';

const COMPONENTS = [About, Works, Contacts];
const PAGES = ['About', 'Works', 'Contacts'];

export class HeaderItem extends React.Component {
    constructor(props) {
        super();
        this.path = props.routePath;
        this.content = props.children;
        this.page = props.pageTitle;
        this.components = COMPONENTS;
        this.pages = PAGES;
        this.index = this.pages.indexOf(this.page);
        this.onRouteOpened = props.onRouteOpened;

        this.state = {
            isActive: this.path === window.location.pathname
        };
    }

    componentWillUpdate() {
        this.saveRouteComponent();
    }

    isActive() {
        return this.path === window.location.pathname;
    }

    saveRouteComponent() {
        if(this.state.isActive || this.path !== window.location.pathname) return;
        this.setState({ isActive: true });
        this.onRouteOpened(this.page);
    }

    render() {
        return (
            <div className={"nav__item " + (this.isActive() ? "_active" : "")}>
                <div className="nav__item-wrapper">
                    <NavLink className="nav__link" exact activeClassName="_active" to={this.path}>
                        {this.page}
                    </NavLink>
                </div>
                {(this.isActive() || this.state.isActive) ? <div className="nav__content"><Content pageTitle={this.page}>{this.state.isActive ? React.createElement(this.components[this.index]) : this.content}</Content></div> : ''}
            </div>
        );
    }
}