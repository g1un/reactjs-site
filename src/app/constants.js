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

export const ADMIN_PAGES = ['Skills', 'Works'];

export const COMPONENTS = [About, Works, Contacts];
export const ADMIN_COMPONENTS = [AdminSkills, AdminWorks];