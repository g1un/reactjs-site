import React from 'react';

import { getData, updateData } from '../../middleware/data';

import Button from 'material-ui-next/Button';
import TextField from 'material-ui-next/TextField';

export default class AdminAbout extends React.Component {
    constructor(props) {
        super();
        this.route = 'contacts';
        this.dataTemplate = {
            email: '',
            tel: '',
            cv: {
                ru: '',
                en: ''
            },
            github: ''
        };
        this.contactsKeys = Object.keys(this.dataTemplate);
        this.state = {
            data: JSON.parse(JSON.stringify(this.dataTemplate)),
            dataLoading: true
        };
    }

    componentDidMount() {
        new getData(this.route, data => this.onDataGot(data)).send();
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

    save(e) {
        e.preventDefault();
        new updateData(this.route, msg => this.onDataUpdated(msg)).send(this.state.data);
    }

    onDataUpdated(message) {
        console.log('save result: ' + message);
    }

    onDataChanged({target}, i, lang) {
        let newData = JSON.parse(JSON.stringify(this.state.data));
        if(lang) {
            newData[this.contactsKeys[i]][lang] = target.value;
        } else {
            newData[this.contactsKeys[i]] = target.value
        }
        this.setState({
            data: newData
        });
    }

    getContent() {
        let content;
        if(this.state.dataLoading) {
            return 'Loading...';
        } else {
            return (
                Object.keys(this.state.data).map((item, i) => {
                    if(item === 'cv') {
                        let _cv = this.state.data[item];
                        let _keys = Object.keys(_cv);
                        return (
                            _keys.map((lang, index) => {
                                return (
                                    <div className="admin-contacts__row" key={this.contactsKeys[i] + '-' + lang}>
                                        <TextField
                                            multiline
                                            label={`CV ${_keys[index]}`}
                                            className="form__textarea admin-contacts__textarea"
                                            value={_cv[lang]}
                                            margin="normal"
                                            onChange={e => this.onDataChanged(e, i, _keys[index])}
                                        />
                                    </div>
                                );
                            })
                        );
                    } else {
                        return (
                            <div className="admin-contacts__row" key={this.contactsKeys[i]}>
                                <TextField
                                    multiline
                                    label={this.contactsKeys[i]}
                                    className="form__textarea admin-contacts__textarea"
                                    value={this.state.data[item]}
                                    margin="normal"
                                    onChange={e => this.onDataChanged(e, i)}
                                />
                            </div>
                        )
                    }
                })
            );
        }
    }

    render() {
        return (
            <form className="admin-item form clearfix admin-contacts" onSubmit={e => this.save(e)}>
                <h2 className="txt-title-2">Contacts</h2>
                <div className="admin-contacts__data">
                    {this.getContent()}
                </div>
                {!this.state.dataLoading &&
                <div className="admin-item__buttons">
                    <div className="admin-item__button cl-b">
                        <Button variant="raised" color="primary" type="submit">Save</Button>
                    </div>
                </div>
                }
            </form>
        );
    }
}