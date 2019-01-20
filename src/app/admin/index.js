import React, {Component} from "react";
import {render} from "react-dom";

import "../../scss/style.scss";

import Admin from "src/app/components/Admin/Admin";
import Header from "src/app/components/Header/Header";
import HeaderItem from "src/app/components/HeaderItem/HeaderItem";

class AdminIndex extends Component {
    constructor() {
        super();
    }

    render() {
        return (
                <div className="container">
                    <Header>
                        <HeaderItem
                            routePath="/admin"
                            pageTitle="Admin"
                        >
                            <Admin/>
                        </HeaderItem>
                    </Header>
                </div>
        );
    }
}

render(<AdminIndex />, window.document.getElementById('app'));