import { About } from './components/About';
import { Works } from './components/Works';
import { Contacts } from './components/Contacts';
import AdminSkills from './components/Admin/AdminAbout';
import AdminWorks from './components/Admin/AdminWorks';
import AdminContacts from './components/Admin/AdminContacts';

export const PATHS = ['/', '/works', '/contacts'];
export const ADMIN_PATHS = ['/admin', '/admin/skills', '/admin/works', '/admin/contacts'];

export const ALL_PATHS = [].concat(PATHS, ADMIN_PATHS);

export const PAGES = {
    'About': 'Обо мне',
    'Works': 'Работы',
    'Contacts': 'Контакты'
};

export const _PAGES = {
    about: {
        title: {
            en: 'About',
            ru: 'Обо мне'
        },
        path: '/'
    },
    works: {
        title: {
            en: 'Works',
            ru: 'Работы'
        },
        path: '/works'
    },
    contacts: {
        title: {
            en: 'Contacts',
            ru: 'Контакты'
        },
        path: '/contacts'
    },
    admin: {
        title: {
            en: 'Admin',
            ru: 'Админка'
        },
        path: '/admin'
    },
    adminSkills: {
        title: {
            en: 'Admin - Skills',
            ru: 'Админка - Обо мне'
        },
        path: '/admin/skills'
    },
    adminWorks: {
        title: {
            en: 'Admin - Works',
            ru: 'Админка - Работы'
        },
        path: '/admin/works'
    },
    adminContacts: {
        title: {
            en: 'Admin - Contacts',
            ru: 'Админка - Контакты'
        },
        path: '/admin/contacts'
    }
};

export const __PAGES = {
	"/": {
		title: {
			en: 'About',
			ru: 'Обо мне'
		}
	},
	"/works": {
		title: {
			en: 'Works',
			ru: 'Работы'
		}
	},
	"/contacts": {
		title: {
			en: 'Contacts',
			ru: 'Контакты'
		}
	},
	"/admin": {
		title: {
			en: 'Admin',
			ru: 'Админка'
		}
	},
	"/admin/skills": {
		title: {
			en: 'Admin - Skills',
			ru: 'Админка - Обо мне'
		}
	},
	"/admin/works": {
		title: {
			en: 'Admin - Works',
			ru: 'Админка - Работы'
		}
	},
	"/admin/contacts": {
		title: {
			en: 'Admin - Contacts',
			ru: 'Админка - Контакты'
		}
	}
};

export const _PAGES_ARR = Object.keys(_PAGES);
export const _PATHS_ARR = Object.keys(_PAGES).map((page) => _PAGES[page].path);


export const ADMIN_PAGES = ['Skills', 'Works', 'Contacts'];

export const COMPONENTS = [About, Works, Contacts];
export const ADMIN_COMPONENTS = [AdminSkills, AdminWorks, AdminContacts];

export const HOST_NAME = IS_PROD ? '' : 'http://localhost:3000';

export const CONTACTS_PARAMS = {
    ru: ['Email', 'Телефон', 'Резюме', 'Github'],
    en: ['Email', 'Phone', 'CV', 'Github']
};