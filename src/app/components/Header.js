import React from 'react';

export class Header extends React.Component {
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