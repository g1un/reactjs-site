class Lang {
    static getBrowserLang() {
		let browserLang = navigator.language || navigator.userLanguage;
		if(/^ru/.test(browserLang)) {
		    return "ru";
        } else {
		    return "en";
        }
	}

    static getLang() {
        let lang = localStorage.getItem("lang");
        if(lang) {
            return lang;
        } else {
            return this.getBrowserLang();
        }
    }

    static langToLocalStorage(lang) {
        localStorage.setItem('lang', lang || this.lang);
    }

    static toggleLang() {
        this.lang = this.lang === 'en' ? 'ru' : 'en';

        this.langToLocalStorage();
    }
}

export default Lang;