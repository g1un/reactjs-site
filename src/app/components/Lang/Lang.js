import React from "react";
import {connect} from "react-redux";

import Lang from "src/app/middleware/lang";

import Button from "@material-ui/core/Button";

class LangComponent extends React.Component {
	setLang(lang) {
		let newLang = lang === "en" ? "ru" : "en";
		this.props.setLang(newLang);
		Lang.langToLocalStorage(newLang);
	}

    render() {
        const {
            lang
        } = this.props.appStore;

        return(
            <Button
				color="primary"
				size="small"
                className="lang"
                onClick={() => this.setLang(lang)}
            >
                {lang === "en" ? "ru" : "en"}
            </Button>
        );
    }
}

export default connect(
	state => ({
		appStore: state
	}),
	dispatch => ({
		setLang: (lang) => {
			dispatch({type: 'LANG', payload: lang})
		}
	})
)(LangComponent);