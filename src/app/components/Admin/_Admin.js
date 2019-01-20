import React, {Component} from "react";
import {BrowserRouter as Router, Route, NavLink, Switch, Redirect} from "react-router-dom";

import Login from "src/app/components/Admin/Login/Login";
import { NotFound } from "../../components/NotFound";

import CheckAuth from "../../middleware/CheckAuth";

import Button from "@material-ui/core/Button";

import { ADMIN_PATHS, ADMIN_PAGES, ADMIN_COMPONENTS } from "../../constants";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            isAuthorized: undefined,
            activeButton: ADMIN_PATHS.indexOf(window.location.pathname) === -1 ? 0 : ADMIN_PATHS.indexOf(window.location.pathname)
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
            activeButton: ADMIN_PATHS.indexOf(path)
        });
    }

    render() {
        return (
            <Router>
                <div className="content">
                    {this.state.isAuthorized === undefined && <div className='admin _ai-c'>Loading...</div>}
                    {this.state.isAuthorized === true &&
                    <div className="admin _jc-fs">
                        <div className="admin__buttons">
                            {ADMIN_PATHS.map((path, i) =>
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
                                    {ADMIN_PAGES[i]}
                                </Button>
                            )}
                        </div>

                        <Switch>
                            {ADMIN_PATHS.map((path, i) =>
                                <Route exact path={path} component={ADMIN_COMPONENTS[i]} key={i}/>
                            )}
                            <Redirect from="/admin" to="/admin/skills"/>
                            <Route render={() => <NotFound text="Error 404. Page not found"/>}/>
                        </Switch>
                    </div>
                    }
                    {this.state.isAuthorized === false &&
                    <div className='admin _ai-c'>
                        <Login authorization={status => this.authorization(status)}/>
                    </div>
                    }
                </div>
            </Router>
        );
    }
}

export default Admin;