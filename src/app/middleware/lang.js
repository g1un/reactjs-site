import { PAGES } from '../constants';

export default class Lang {

    static getLang() {
        let lang = localStorage.getItem('lang');
        if(lang) {
            return lang;
        } else {
            this.getHtmlLang();
        }
    }

    static getHtmlLang() {
        let lang = document.documentElement.lang;
        localStorage.setItem('lang', lang);

        return lang;
    }

    static langToLocalStorage(lang) {
        localStorage.setItem('lang', lang);
    }

    static getPages(lang) {
        let enArr = Object.keys(PAGES);

        if(lang === 'ru') {
            return enArr.map((item) => PAGES[item]);
        } else {
            return enArr;
        }
    }
}