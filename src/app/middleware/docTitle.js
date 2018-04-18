import Lang from './lang';

import { _PAGES, _PAGES_ARR, _PATHS_ARR } from '../constants';

export default class DocTitle {
    constructor() {
    }

    static get() {
        let pageIndex = _PATHS_ARR.indexOf(window.location.pathname);
        let lang = Lang.getLang();

        if(pageIndex === -1) {
            return 'Not found';
        } else {
            return _PAGES[_PAGES_ARR[pageIndex]].title[lang];
        }
    }
}