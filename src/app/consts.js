import About from "src/app/components/About/About";
import Works from "src/app/components/Works/Works";
import Contacts from "src/app/components/Contacts/Contacts";
import AdminSkills from "src/app/components/Admin/AdminAbout";
import AdminWorks from "src/app/components/Admin/AdminWorks";
import AdminContacts from "src/app/components/Admin/AdminContacts";

export const PATHS = ['/', '/works', '/contacts'];
export const ADMIN_PATHS = ['/admin', '/admin/skills', '/admin/works', '/admin/contacts'];

export const ALL_PATHS = ['/admin'].concat(PATHS, ADMIN_PATHS);

export const PAGES = {
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
	}
};

export const ADMIN_PAGES = {
    // "/admin": {
    //     title: {
    //         en: 'Admin',
    //         ru: 'Админка'
    //     }
    // },
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

export const PAGES_ARR = Object.keys(PAGES);
export const _PATHS_ARR = Object.keys(PAGES).map((page) => PAGES[page].path);

export const ADMINPAGES = ['Skills', 'Works', 'Contacts'];

export const COMPONENTS = [About, Works, Contacts];
export const ADMIN_COMPONENTS = [AdminSkills, AdminWorks, AdminContacts];

export const SITE_TITLE = {
    en: "Ilya Smal Frontend Developer",
    ru: "Илья Смаль Фронтент Разработчик"
}

export const HOST_NAME = IS_PROD ? '' : 'http://localhost:3000';

export const CONTACTS_PARAMS = {
    ru: ['Email', 'Телефон', 'Резюме', 'Github'],
    en: ['Email', 'Phone', 'CV', 'Github']
};