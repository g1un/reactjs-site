import React from 'react';

import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';

import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/button/dist/mdc.button.min.css';

export default class Signup extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            error: false
        };
        this.authorization = props.authorization;
    }

    getFormValue({target}) {
        this.setState({
            [target.name]: target.value
        });
    }

    login(e) {
        e.preventDefault();
        this.getXhrBody();
        this.send();
    }

    getXhrBody() {
        this.xhrBody = JSON.stringify({
            "email": this.state.email,
            "password": this.state.password
        });
    }

    send() {
        let xhr = new XMLHttpRequest();
        xhr.onload = this.jwtToLocalStorage.bind(this, xhr);
        xhr.open("post", "http://localhost:3000/user/login", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(this.xhrBody);
    }

    jwtToLocalStorage(xhr) {
        let response = JSON.parse(xhr.responseText);
        let jwtToken = response.token;
        if(jwtToken) {
            localStorage.setItem('jwt', jwtToken);
        } else {
            this.setState({
                error: response.message
            });
        }

        this.authorization(xhr.status === 200);
    }

    render() {
        return (
            <form className="login form" onSubmit={e => this.login(e)}>
                <h2 className="txt-title-2">log in</h2>
                <div className="form__item">
                    <TextField className="form__input" label="email" name="email" id="email" value={this.state.email} onChange={e => this.getFormValue(e)}/>
                </div>
                <div className="form__item">
                    <TextField type="password" className="form__input" label="password" name="password" id="password" value={this.state.password} onChange={e => this.getFormValue(e)}/>
                </div>
                <Button raised type="submit" className="form__button" id="login">sign up</Button>
                {this.state.error !== false &&
                    <div className="error">
                        Error: {this.state.error}
                    </div>
                }
            </form>
        );
    }
}