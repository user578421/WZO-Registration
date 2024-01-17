import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ru from "./locales/ru.json";
import ua from "./locales/ua.json";
import he from "./locales/he.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        fallbackLng: "en",
        debug: true,
        resources: {
            en: {
                translation: en
            },
            fr: {
                translation: fr
            },
            ru: {
                translation: ru
            },
            ua: {
                translation: ua
            },
            he: {
                translation: he
            }
        },
        defaultNS: "translation",
        keySeparator: ".",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
