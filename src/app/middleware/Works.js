export class GetWorks {
    constructor(get) {
        this.onloadGet = get;
    }

    send() {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onWorksGot(xhr);
        xhr.open("get", "http://localhost:3000/admin/works", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }

    onWorksGot(xhr) {
        let works = JSON.parse(xhr.responseText);
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
        xhr.open("post", "http://localhost:3000/admin/works", true);
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);

        let formData = new FormData();
        Object.keys(work).map((item) => {
            formData.append(item, work[item]);
        });
        xhr.send(formData);
    }

    onWorksUpdated(xhr) {
        let message = JSON.parse(xhr.responseText);
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
        xhr.open("delete", `http://localhost:3000/admin/works/${id}`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);
        xhr.send();
    }

    onWorksUpdated(xhr) {
        let message = JSON.parse(xhr.responseText).message;
        this.onloadDelete(message);
    }
}