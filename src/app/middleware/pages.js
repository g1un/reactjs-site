import { PAGES } from '../constants';

export default class Pages {

    static getPages(lang) {
        let enArr = Object.keys(PAGES);

        if(lang === 'ru') {
            return enArr.map((item) => PAGES[item]);
        } else {
            return enArr;
        }
    }
}