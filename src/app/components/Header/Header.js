import React, {Component} from "react";

import HeaderItem from 'src/app/components/HeaderItem';

import {PATHS} from "src/app/constants";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <nav className="nav">
                    <div className="nav__list">
						{PATHS.map((path, i) => {
							return (
                                <HeaderItem key={i} index={i}/>
							);
						})}
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;