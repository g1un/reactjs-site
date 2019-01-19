import { HOST_NAME } from '../constants';

export class GetWorks {
    constructor(get) {
        this.onloadGet = get;
    }

    send() {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onWorksGot(xhr);
        xhr.open("get", `${HOST_NAME}/api/works`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }

    onWorksGot(xhr) {
        let works = JSON.parse(xhr.responseText);

        works = works.map((work) => {
            work.imageSrc = HOST_NAME + '/' + work.imageSrc;
            return work;
        });

        this.onloadGet(works);
    }
}

export class UpdateWork {
    constructor(update) {
        this.jwt = localStorage.getItem('jwt');
        this.onloadUpdate = update;
    }

    send(work) {
        //@todo filter work from unnecessary properties
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onWorksUpdated(xhr);
        xhr.open("post", `${HOST_NAME}/api/works`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);

        let formData = new FormData();
        Object.keys(work).map((item) => {
            if(item !== 'imageSrc') {
                formData.append(item, work[item]);
            }
        });
        xhr.send(formData);
    }

    onWorksUpdated(xhr) {
        let message = JSON.parse(xhr.responseText);

        message.work.imageSrc = HOST_NAME + '/' + message.work.imageSrc;

        this.onloadUpdate(message);
    }
}

export class DeleteWork {
    constructor(update) {
        this.jwt = localStorage.getItem('jwt');
        this.onloadDelete = update;
    }

    send(id) {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onWorksUpdated(xhr);
        xhr.open("delete", `${HOST_NAME}/api/works/${id}`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);
        xhr.send();
    }

    onWorksUpdated(xhr) {
        let message = JSON.parse(xhr.responseText).message;
        this.onloadDelete(message);
    }
}

export class UpdateWorkIndex {
    constructor(update) {
        this.jwt = localStorage.getItem('jwt');
        this.onIndexesUpdated = update;
    }

    send([prev, next]) {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onWorksUpdated(xhr);
        xhr.open("post", `${HOST_NAME}/api/works`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);

        let body = JSON.stringify({
            changeIndexes: true,
            prev: prev,
            next: next
        });

        xhr.send(body);
    }

    onWorksUpdated(xhr) {
        this.onIndexesUpdated();
        console.log('Indexes changing result: ', JSON.parse(xhr.responseText));
    }
}