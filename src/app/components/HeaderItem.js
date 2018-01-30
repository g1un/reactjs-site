import React from 'react';
import { NavLink } from 'react-router-dom';

export class HeaderItem extends React.Component {
    constructor(props) {
        super();
        this.path = props.routePath;
        this.content = props.children;
        this.page = props.pageTitle;
    }

    isActive() {
        return this.path === window.location.pathname;
    }

    render() {
        return (
            <div className={"nav__item " + (this.isActive() ? "_active" : "")}>
                <NavLink className="nav__link" exact activeClassName="_active" to={this.path}>
                    {this.page}
                </NavLink>
                {this.isActive() ? <div className="nav__content content">{this.content}</div> : ''}
            </div>
        );
    }
}