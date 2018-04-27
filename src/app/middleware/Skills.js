import { HOST_NAME } from '../constants';

export class getSkills {
    constructor(get) {
        this.onloadGet = get;
    }

    send() {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onSkillsGot(xhr);
        xhr.open("get", `${HOST_NAME}/admin/skills`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }

    onSkillsGot(xhr) {
        let response = JSON.parse(xhr.responseText).response;
        let skills = false;
        if(response.length) {
            skills = response[0].skills;
        }
        this.onloadGet(skills);
    }
}

export class updateSkills {
    constructor(update) {
        this.jwt = localStorage.getItem('jwt');
        this.onloadUpdate = update;
    }

    send(skills) {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => this.onSkillsUpdated(xhr);
        xhr.open("post", `${HOST_NAME}/admin/skills`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);

        let body = JSON.stringify(skills);
        xhr.send(body);
    }

    onSkillsUpdated(xhr) {
        let message = JSON.parse(xhr.responseText).message;
        this.onloadUpdate(message);
    }
}