import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Lang from './middleware/lang';

import './../scss/style.scss';

import { Header } from './components/Header';
import { HeaderItem } from './components/HeaderItem';
import { NotFound } from './components/NotFound';
import { LangComponent } from './components/Lang';

import { PATHS, ALL_PATHS, COMPONENTS } from './constants'

class App extends React.Component {
    constructor() {
        super();
        this.paths = PATHS;
        this.lang = Lang.getLang();
        this.components = COMPONENTS;
        this.state = {
            documentTitle: this.getDocumentTitle(Lang.getPages()),
            lang: Lang.getLang(),
            pages: Lang.getPages()
        };
    }

    updateDocumentTitle(pageTitle) {
        if(this.state.documentTitle === pageTitle) return;
        this.setState({
            documentTitle: this.getDocumentTitle(Lang.getPages())
        });
    }

    getDocumentTitle(pages) {
        let pathIndex = this.paths.indexOf(window.location.pathname);
        if(pathIndex === -1) {
            return 'Not found';
        } else {
            return pages[pathIndex];
        }
    }

    toggleLang() {
        Lang.toggleLang();

        this.setState({
            lang: Lang.getLang(),
            pages: Lang.getPages()
        });
    }

    render() {
        return (
            <DocumentTitle title={this.state.documentTitle}>
                <Router>
                    <div className="container">
                        <LangComponent lang={this.state.lang} toggleLang={() => this.toggleLang()}/>
                        <Switch>
                            {ALL_PATHS.map((path, i) => {
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
                                        pageTitle={this.state.pages[i]}
                                        updateDocumentTitle={this.updateDocumentTitle.bind(this)}
                                        index={i}
                                    >
                                        <Route exact path={path} component={this.components[i]}/>
                                    </HeaderItem>
                                );
                            })}
                        </Header>
                        <Switch>
                            {ALL_PATHS.map((path, i) => {
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