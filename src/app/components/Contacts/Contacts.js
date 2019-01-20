import React, {Component} from "react";
import {connect} from "react-redux";

import {getData} from "src/app/middleware/data";

import {PAGES, CONTACTS_PARAMS} from "src/app/consts";

class Contacts extends Component {
    constructor() {
        super();
        this.route = "/api/contacts";
        this.state = {
            data: {
                email: "",
                tel: "",
                cv: {
                    ru: "",
                    en: ""
                },
                github: ""
            },
            contactsIsLoaded: false
        };
        this.dataKeys = Object.keys(this.state.data);
    }

    onDataGot(data) {
        if(data) {
            this.setState({
                data: data,
                contactsIsLoaded: true
            });
        } else {
            this.setState({
                contactsIsLoaded: true
            });
        }
    }

    getContent(lang) {
        return this.dataKeys.map((item, i) => {
            let _value = item === "cv" ? this.state.data[item][lang] : this.state.data[item];
            let _linkPrefix = "";
            let _target = "_blank";

            if(item === "email") {
                _linkPrefix = "mailto:";
                _target = "_self";
            } else if(item === "tel") {
                _linkPrefix = "tel:";
                _target = "_self";
            }

            return (
                <div className="contacts__row" key={i}>
                    <div className="contacts__key">{CONTACTS_PARAMS[lang][i]}:</div>
                    <div className="contacts__value">
                        <a href={_linkPrefix + _value} target={_target}>
                            {item === "cv" ? (lang === "ru" ? "посмотреть" : "view") : _value}
                        </a>
                    </div>
                </div>
            );
        });
    }

    render() {
		const {
			path
		} = this.props;

        const {
            contactsIsLoaded
        } = this.state;

		const {
			lang
		} = this.props.appStore;

        if(!contactsIsLoaded) new getData(this.route, data => this.onDataGot(data)).send();

        return (
            <div className="contacts">
                <h2 className="txt-title-2">
					{PAGES[path].title[lang]}
                </h2>
                <div className="contacts__data">
					{this.getContent(lang)}
                </div>
            </div>
        );
    }
}

export default connect(
	state => ({
		appStore: state
	})
)(Contacts);