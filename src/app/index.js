import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import style from './../scss/style.scss';

import { Header } from './components/Header';
import { About } from './components/About';
import { Works } from './components/Works';
import { Contacts } from './components/Contacts';
import { NotFound } from './components/NotFound';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={About}/>
                        <Route exact path="/works" component={Works}/>
                        <Route exact path="/contacts" component={Contacts}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));