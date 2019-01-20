import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {HOST_NAME} from '../../../constants';

class Signup extends React.Component {
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
		xhr.open("post", `${HOST_NAME}/api/user/login`, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(this.xhrBody);
	}

	jwtToLocalStorage(xhr) {
		let response = JSON.parse(xhr.responseText);
		let jwtToken = response.token;
		if (jwtToken) {
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
					<TextField
						type="text"
						id="email"
						name="email"
						label="email"
						className="form__input"
						value={this.state.email}
						margin="normal"
						onChange={e => this.getFormValue(e)}
					/>
				</div>
				<div className="form__item">
					<TextField
						type="password"
						id="password"
						name="password"
						label="password"
						className="form__input"
						value={this.state.password}
						margin="normal"
						onChange={e => this.getFormValue(e)}
					/>
				</div>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					className="form__button"
					id="login"
				>
					sign up
				</Button>
				{this.state.error &&
					<div className="error">
						Error: {this.state.error}
					</div>
				}
			</form>
		);
	}
}

export default Signup;