import { PAGES } from '../constants';

export default class Lang {
    constructor() {
        this.lang = this.getLang();
    }

    static getLang() {
        this.lang = localStorage.getItem('lang');
        if(this.lang) {
            return this.lang;
        } else {
            this.getHtmlLang();
        }
    }

    static getHtmlLang() {
        this.lang = document.documentElement.lang;
        this.langToLocalStorage();

        return this.lang;
    }

    static langToLocalStorage() {
        localStorage.setItem('lang', this.lang);
    }

    static toggleLang() {
        this.lang = this.lang === 'en' ? 'ru' : 'en';

        this.langToLocalStorage();
    }

    static getPages() {
        let enArr = Object.keys(PAGES);

        if(this.lang === 'ru') {
            return enArr.map((item) => PAGES[item]);
        } else {
            return enArr;
        }
    }
}