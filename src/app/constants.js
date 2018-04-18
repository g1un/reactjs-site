import { About } from './components/About';
import { Works } from './components/Works';
import { Contacts } from './components/Contacts';
import AdminSkills from './components/admin/AdminAbout';
import AdminWorks from './components/admin/AdminWorks';

export const PATHS = ['/', '/works', '/contacts'];
export const ADMIN_PATHS = ['/admin/skills', '/admin/works'];

export const ALL_PATHS = ['/admin'].concat(PATHS, ADMIN_PATHS);

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

export const _PAGES_ARR = Object.keys(_PAGES);
export const _PATHS_ARR = Object.keys(_PAGES).map((page) => _PAGES[page].path);


export const ADMIN_PAGES = ['Skills', 'Works'];

export const COMPONENTS = [About, Works, Contacts];
export const ADMIN_COMPONENTS = [AdminSkills, AdminWorks];