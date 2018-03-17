import React from 'react';

import Login from './Login';
import AdminAbout from './AdminAbout';
import AdminWorks from './AdminWorks';

import CheckAuth from '../../middleware/CheckAuth';

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
            <div className={'admin' + (this.state.isAuthorized !== true ? ' _ai-c' : '')}>
                {this.state.isAuthorized === undefined ? 'Loading...' : ''}
                {/*{this.state.isAuthorized === true &&*/}
                    {/*<AdminAbout childClass="admin__item"/>*/}
                {/*}*/}
                {this.state.isAuthorized === true &&
                    <AdminWorks childClass="admin__item"/>
                }
                {this.state.isAuthorized === false ? <Login authorization={status => this.authorization(status)}/> : ''}
            </div>
        );
    }
}