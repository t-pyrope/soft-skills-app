import { getLocales } from 'expo-localization';

const locales = getLocales();
export const initialLocale =
    locales.find((locale) => ['en', 'ru', 'cs'].includes(locale.languageCode ?? ''))
        ?.languageCode ?? 'en';
