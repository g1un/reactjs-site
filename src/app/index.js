import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import './../scss/style.scss';

import { Header } from './components/Header';
import { HeaderItem } from './components/HeaderItem';
import { NotFound } from './components/NotFound';

import { PATHS, PAGES, COMPONENTS } from './constants'

class App extends React.Component {
    constructor() {
        super();
        this.paths = PATHS;
        this.pages = PAGES;
        this.components = COMPONENTS;
        this.state = {
            documentTitle: this.getDocumentTitle()
        };
    }

    updateDocumentTitle(pageTitle) {
        if(this.state.documentTitle === pageTitle) return;
        this.setState({
            documentTitle: this.getDocumentTitle()
        });
    }

    getDocumentTitle() {
        let pathIndex = this.paths.indexOf(window.location.pathname);
        if(pathIndex === -1) {
            return 'Not found';
        } else {
            return this.pages[pathIndex];
        }
    }

    render() {
        return (
            <DocumentTitle title={this.state.documentTitle}>
                <Router>
                    <div className="container">
                        <Switch>
                            {this.paths.map((path, i) => {
                                return <Route key={i} exact strict path={path}/>;
                            })}
                            <Route render={() => <NotFound text="Error 404"/>}/>
                        </Switch>
                        <Header>
                            {this.paths.map((path, i) => {
                                return (
                                    <HeaderItem
                                        key={i}
                                        routePath={path}
                                        pageTitle={this.pages[i]}
                                        updateDocumentTitle={this.updateDocumentTitle.bind(this)}
                                    >
                                        <Route exact path={path} component={this.components[i]}/>
                                    </HeaderItem>
                                );
                            })}
                        </Header>
                        <Switch>
                            {this.paths.map((path, i) => {
                                return <Route key={i} exact strict path={path}/>;
                            })}
                            <Route render={() => <NotFound text="Page not found"/>}/>
                        </Switch>
                    </div>
                </Router>
            </DocumentTitle>
        );
    }
}

render(<App />, window.document.getElementById('app'));