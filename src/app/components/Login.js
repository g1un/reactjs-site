import React from 'react';

export default class Signup extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: ''
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
        let jwtToken = JSON.parse(xhr.responseText).token;
        localStorage.setItem('jwt', jwtToken);

        this.authorization(xhr.status === 200);
    }

    render() {
        return (
            <div className="login">
                <h2>log in</h2>
                <label htmlFor="email">
                    Email
                    <br/>
                    <input type="text" name="email" id="email" onChange={e => this.getFormValue(e)}/>
                </label>
                <br/>
                <label htmlFor="password">
                    Password
                    <br/>
                    <input type="password" name="password" id="password" onChange={e => this.getFormValue(e)}/>
                </label>
                <br/>
                <button type="button" id="login" onClick={e => {this.login(e)}}>sign up</button>
            </div>
        );
    }
}