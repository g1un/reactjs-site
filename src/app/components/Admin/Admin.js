import React, {Component} from "react";
import {Route, NavLink, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Login from "src/app/components/Admin/Login/Login";
import HeaderItem from "src/app/components/HeaderItem/HeaderItem";

import CheckAuth from "src/app/middleware/CheckAuth";

import Button from "@material-ui/core/Button";

import {ADMIN_PAGES, ADMIN_COMPONENTS} from "src/app/consts";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            isAuthorized: undefined,
            activeButton: Object.keys(ADMIN_PAGES).indexOf(window.location.pathname) === -1 ? 0 : Object.keys(ADMIN_PAGES).indexOf(window.location.pathname)
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

    toggleActive(path) {
        this.setState({
            activeButton: Object.keys(ADMIN_PAGES).indexOf(path)
        });
    }

    render() {
        const {
            lang
        } = this.props.appStore;

        return (
            <HeaderItem isAdminPages={true} path="/admin/skills">
                <div className="content">
                    {this.state.isAuthorized === undefined && <div className='admin _ai-c'>Loading...</div>}
                    {this.state.isAuthorized === true &&
                    <div className="admin _jc-fs">
                        <div className="admin__buttons">
                            {Object.keys(ADMIN_PAGES).map((path, i) =>
                                <Button
                                    variant="contained"
                                    color={this.state.activeButton === i ? 'primary' : 'default'}
                                    className="admin__btn"
                                    component={NavLink}
                                    exact
                                    to={path}
                                    key={i}
                                    onClick={() => this.toggleActive(path)}
                                >
                                    {ADMIN_PAGES[path].title[lang]}
                                </Button>
                            )}
                        </div>

                        <Switch>
                            {Object.keys(ADMIN_PAGES).map((path, i) =>
                                <Route exact path={path} component={ADMIN_COMPONENTS[i]} key={i}/>
                            )}
                        </Switch>
                    </div>
                    }
                    {this.state.isAuthorized === false &&
                    <div className='admin _ai-c'>
                        <Login authorization={status => this.authorization(status)}/>
                    </div>
                    }
                </div>
            </HeaderItem>
        );
    }
}

export default withRouter(
    connect(
        state => ({
            appStore: state
        })
)(Admin));