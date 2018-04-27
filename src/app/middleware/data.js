import { HOST_NAME } from '../constants';

export class getData {
    constructor(route, get) {
        this.onloadGet = get;
        this.route = HOST_NAME + '/' + route;
    }

    send() {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onDataGot(xhr);
        xhr.open("get", this.route, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }

    onDataGot(xhr) {
        let response = JSON.parse(xhr.responseText).response;
        let data = false;
        if(Object.keys(response).length) {
            data = response;
        }
        this.onloadGet(data);
    }
}

export class updateData {
    constructor(route, update) {
        this.jwt = localStorage.getItem('jwt');
        this.onloadUpdate = update;
        this.route = HOST_NAME + '/' + route;
    }

    send(data) {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onDataUpdated(xhr);
        xhr.open("post", this.route, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);

        let body = JSON.stringify(data);
        xhr.send(body);
    }

    onDataUpdated(xhr) {
        let message = JSON.parse(xhr.responseText).message;
        this.onloadUpdate(message);
    }
}