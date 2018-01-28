import React from 'react';
import { NavLink } from 'react-router-dom';

export class HeaderItem extends React.Component {
    render() {
        return (
            <div className={"nav__item " + (this.props.pageContent ? "_active" : "")}>
                <NavLink className="nav__link" exact activeClassName="_active" to={this.props.currentPath}>
                    {this.props.currentPage}
                </NavLink>
                {this.props.pageContent ? <div className="nav__content content">{this.props.pageContent}</div> : ''}
            </div>
        );
    }
}