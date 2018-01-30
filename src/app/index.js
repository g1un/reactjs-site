import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import style from './../scss/style.scss';

import { Header } from './components/Header';
import { HeaderItem } from './components/HeaderItem';
import { About } from './components/About';
import { Works } from './components/Works';
import { Contacts } from './components/Contacts';
import { NotFound } from './components/NotFound';

const PATHS = ['/', '/works', '/contacts'];
const PAGES = ['About', 'Works', 'Contacts'];
const COMPONENTS = [About, Works, Contacts];

class App extends React.Component {
    constructor() {
        super();
        this.paths = PATHS;
        this.pages = PAGES;
        this.components = COMPONENTS;
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Header>
                        {this.paths.map((path, i) => {
                            return <HeaderItem key={i} routePath={path} pageTitle={this.pages[i]}><Route exact path={path} component={this.components[i]}/></HeaderItem>;
                        })}
                        <Switch>
                            {this.paths.map((path, i) => {
                                return <Route key={i} exact path={path}/>;
                            })}
                            <Route component={NotFound}/>
                        </Switch>
                    </Header>
                </div>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));