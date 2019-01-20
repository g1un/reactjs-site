import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import {Provider} from "react-redux";
import {createStore} from "redux";

import Lang from './middleware/lang';
import DocTitle from './middleware/docTitle';

import './../scss/style.scss';

import Main1 from "src/app/components/Main/Main";
import Header from './components/Header/Header';
import { HeaderItem } from './components/HeaderItem';
import { NotFound } from './components/NotFound';
import { LangComponent } from './components/Lang';

import { PATHS, ALL_PATHS, COMPONENTS } from './constants';


import HeaderItem1 from "src/app/components/HeaderItem/HeaderItem";

function reducer(state = {
	pagePath: window.location.pathname,
	lang: Lang.getLang()
}, action) {
	switch(action.type) {
		case "PAGE_PATH":
			return {
				...state,
				pagePath: action.payload
			};
			break;
		case "PAGE_TITLE":
			return {
				...state,
				pageTitle: action.payload
			};
			break;
		case "LANG":
			return {
				...state,
				lang: action.payload
			};
		default:
			return state;
	}
}

const store = createStore(reducer);

class App extends React.Component {
    constructor() {
        super();
        this.paths = PATHS;
        this.lang = Lang.getLang();
        this.components = COMPONENTS;
        this.state = {
            // documentTitle: DocTitle.get(),
            lang: Lang.getLang(),
            pages: Lang.getPages(),
			anything: false
        };
    }

    doAny = () => {
    	this.setState({
			anything: !this.state.anything
		})
	}

    // updateDocumentTitle(pageTitle) {
    //     if(this.state.documentTitle === pageTitle) return;
    //     this.setState({
    //         documentTitle: DocTitle.get()
    //     });
    // }

    toggleLang() {
        Lang.toggleLang();

        this.setState({
            lang: Lang.getLang(),
            pages: Lang.getPages()
        });
    }

    render() {
    	console.log('index')

		const pagePath = window.location.pathname;

		const isAdminPage = /^\/admin(.*)$/.test(pagePath);

        return (
			<Provider store={store}>
            {/*<DocumentTitle title={this.state.documentTitle}>*/}
                <Router>
                    <div className="container">
                        <LangComponent toggleLang={() => this.toggleLang()}/>
                        <Switch>
                            {ALL_PATHS.map((path, i) => {
                                return <Route key={i} exact strict path={path}/>;
                            })}
                            <Route render={() => <NotFound text="Error 404"/>}/>
                        </Switch>

						{/*<header className="header">*/}
							{/*<nav className="nav">*/}
								{/*<div className="nav__list">*/}
									{/*{PATHS.map((path, i) => (*/}
										{/*<HeaderItem1 key={i} index={i} doAny={this.doAny}>*/}
											{/*<Route*/}
												{/*exact*/}
												{/*path={path}*/}
												{/*component={() => React.createElement(COMPONENTS[i], {path: path})}*/}
											{/*/>*/}
										{/*</HeaderItem1>*/}
									{/*))}*/}
								{/*</div>*/}
							{/*</nav>*/}
						{/*</header>*/}


						<Header/>
                        <Switch>
                            {ALL_PATHS.map((path, i) => {
                                return <Route key={i} exact strict path={path}/>;
                            })}
                            <Route render={() => <NotFound text="Page not found"/>}/>
                        </Switch>
                    </div>
                </Router>
            {/*</DocumentTitle>*/}
			</Provider>
        );
    }
}

render(<App />, window.document.getElementById('app'));