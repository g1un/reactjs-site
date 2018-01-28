import React from 'react';

const PATHS = ['/', '/works', '/contacts'];
const PAGES = ['About', 'Works', 'Contacts'];

import { HeaderItem } from './HeaderItem';

export class Header extends React.Component {
    constructor(props) {
        super();
        this.currentPath = props.currentPath;
        this.content = props.children;
        this.paths = PATHS;
        this.pages = PAGES;
    }

    render() {
        return (
            <header className="header">
                <nav className="nav">
                    <div className="nav__list">
                        {this.paths.map((path, i) => {
                            return <HeaderItem key={i} currentPath={path} currentPage={this.pages[i]} pageContent={path === this.currentPath ? this.content : ''}/>;
                        })}
                    </div>
                </nav>
            </header>
        );
    }
}