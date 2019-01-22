import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

import Lang from "src/app/middleware/lang";

import "src/scss/style.scss";

import Site from "src/app/components/Site/Site";

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
    render() {
        return (
            <Provider store={store}>
				<Site/>
            </Provider>
        );
    }
}

render(<App />, window.document.getElementById("app"));