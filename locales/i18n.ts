import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './en.json';
import ru from './ru.json';
import cs from './cs.json';
import { initialLocale } from '@/constants/locales';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
    en,
    ru,
    cs,
});

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0]?.languageCode || initialLocale;

export {
    i18n,
};
