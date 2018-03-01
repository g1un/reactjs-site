import React from 'react';

import Login from './Login';

import CheckAuth from './../middleware/CheckAuth';

export class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthorized: undefined
        };
    }

    componentDidMount() {
        new CheckAuth(this.authorization.bind(this));
    }

    authorization(status) {
        this.setState({
            isAuthorized: status
        });
    }

    render() {
        return (
            <div className="admin">
                {this.state.isAuthorized === undefined ? 'Loading...' : ''}
                {this.state.isAuthorized === true ? 'Authorized' : ''}
                {this.state.isAuthorized === false ? <Login authorization={status => this.authorization(status)}/> : ''}
            </div>
        );
    }
}