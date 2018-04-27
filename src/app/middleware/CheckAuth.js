import { HOST_NAME } from '../constants';

export default class CheckAuth {
    constructor(authorization) {
        this.authorization = authorization;

        this.checkJwt();
    }

    checkJwt() {
        this.jwt = localStorage.getItem('jwt');
        if(!this.jwt) {
            this.authorization(false);
        } else {
            this.send();
        }
    }

    send() {
        let xhr = new XMLHttpRequest();
        xhr.onload = this.resListener.bind(this, xhr);
        xhr.open("get", `${HOST_NAME}/admin`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);
        xhr.send();
    }

    resListener(xhr) {
        this.authorization(xhr.status === 200);
    }
}