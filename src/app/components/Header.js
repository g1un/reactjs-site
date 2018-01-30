import React from 'react';

const PATHS = ['/', '/works', '/contacts'];
const PAGES = ['About', 'Works', 'Contacts'];

export class Header extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <header className="header">
                <nav className="nav">
                    <div className="nav__list">
                        {this.props.children}
                    </div>
                </nav>
            </header>
        );
    }
}