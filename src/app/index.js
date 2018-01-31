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
        this.state = {
            routes: {}
        };

        this.pages.forEach(function(page, i) {
            this.state.routes[page] = this.paths[i] === window.location.pathname;
        }, this);
    }

    onRouteOpened(page) {
        let _obj = Object.assign({}, this.state.routes);
        _obj[page] = true;
        this.setState({routes: _obj});
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Switch>
                        {this.paths.map((path, i) => {
                            return <Route key={i} exact path={path}/>;
                        })}
                        <Route render={() => <NotFound text="Error 404"/>}/>
                    </Switch>
                    <Header>
                        {this.paths.map((path, i) => {
                            return <HeaderItem key={i} routePath={path} pageTitle={this.pages[i]} onRouteOpened={this.onRouteOpened.bind(this)}><Route exact path={path} component={this.components[i]}/></HeaderItem>;
                        })}
                    </Header>
                    <Switch>
                        {this.paths.map((path, i) => {
                            return <Route key={i} exact path={path}/>;
                        })}
                        <Route render={() => <NotFound text="Page not found"/>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));