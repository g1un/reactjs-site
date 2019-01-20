import React from 'react';
import {withRouter} from "react-router-dom";

import { getData } from '../middleware/data';

import { CONTACTS_PARAMS } from '../constants';

class _Contacts extends React.Component {
    constructor() {
        super();
        this.route = '/api/contacts';
        this.state = {
            data: {
                email: '',
                tel: '',
                cv: {
                    ru: '',
                    en: ''
                },
                github: ''
            },
            dataLoading: true
        };
        this.dataKeys = Object.keys(this.state.data);
    }

    componentDidMount() {
        if(this.props.isActive) new getData(this.route, data => this.onDataGot(data)).send();
    }

    onDataGot(data) {
        if(data) {
            this.setState({
                data: data,
                dataLoading: false
            });
        } else {
            this.setState({
                dataLoading: false
            });
        }
    }

    getContent() {
        return this.dataKeys.map((item, i) => {
            let _lang = this.props.lang;
            let _value = item === 'cv' ? this.state.data[item][_lang] : this.state.data[item];
            let _linkPrefix = '';
            let _target = '_blank';

            if(item === 'email') {
                _linkPrefix = 'mailto:';
                _target = '_self';
            } else if(item === 'tel') {
                _linkPrefix = 'tel:';
                _target = '_self';
            }

            return (
                <div className="contacts__row" key={i}>
                    <div className="contacts__key">{CONTACTS_PARAMS[this.props.lang][i]}:</div>
                    <div className="contacts__value">
                        <a href={_linkPrefix + _value} target={_target}>
                            {item === 'cv' ? 'view' : _value}
                        </a>
                    </div>
                </div>
            );
        });
    }

    render() {
        // console.log('oldcontacts', this.props.location);
        return (
            <div className="contacts">
                <h1>
                    {this.props.pageTitle}
                </h1>
                <div className="contacts__data">
                    {this.getContent()}
                </div>
            </div>
        );
    }
}

let Contacts = withRouter(_Contacts);

export {Contacts};