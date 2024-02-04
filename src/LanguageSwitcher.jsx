import {useTranslation} from "react-i18next";
import React, {useEffect, useRef, useState} from "react";
import {useOnClickOutside} from "./useOnClickOutside.jsx";
import {a} from "./Arimo-bold.js";

export const locales = {
    en: "English",
    fr: "Français",
    ru: "русский",
    ua: "український",
    he: "עברית",
    es: "Español",
};
export const LanguageSwitcher = () => {
    const {i18n} = useTranslation();

    useEffect(() => {
        //if language is not in the list of supported languages, default to english
        if (!Object.keys(locales).includes(i18n.language)) {
            i18n.changeLanguage("en");
        }
    }, [i18n.language]);

    const languageDropdownRef = useRef();
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    
    useOnClickOutside(languageDropdownRef, () => {
        setLangDropdownOpen(false);
    }, []);
    const flagIcon = (lang) => {
        return <span className="inline-flex items-center justify-center">
                    <img
                        src={`https://flagcdn.com/16x12/${lang === "en" ? "us" : lang === "he" ? "il" : lang}.png`}
                        alt={locales[lang]}
                    />
                </span>;
    }

    return <div className={`flex justify-center`}>
        <div ref={languageDropdownRef} className={`relative inline-block text-start`}>
            <div>
                <button
                    type="button"
                    className={`inline-flex flex-row gap-2 justify-center w-full rounded-md 
                        border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium 
                        text-gray-700 
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-50
                        items-center
                        `}
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
                    {/*Flag based on language*/}
                    {flagIcon(i18n.language)}
                    {locales[i18n.language]}
                </button>
            </div>
            {/* Dropdown menu, show/hide based on menu state. */}
            {langDropdownOpen && (
                <div
                    className={`origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 start-0`}
                >
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <a href="#" onClick={() => {
                            i18n.changeLanguage("en");
                            setLangDropdownOpen(false);
                        }}
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                           role="menuitem"
                        >
                            {flagIcon("en")}&nbsp;&nbsp;English
                        </a>
                        <a href="#" onClick={() => {
                            i18n.changeLanguage("fr");
                            setLangDropdownOpen(false);
                        }}
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                           role="menuitem"
                        >
                            {flagIcon("fr")}&nbsp;&nbsp;Français
                        </a>
                        <a href="#" onClick={() => {
                            i18n.changeLanguage("ru");
                            setLangDropdownOpen(false);
                        }}
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                           role="menuitem"
                        >
                            {flagIcon("ru")}&nbsp;&nbsp;русский</a>
                        <a href="#" onClick={() => {
                            i18n.changeLanguage("ua");
                            setLangDropdownOpen(false);
                        }}
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                           role="menuitem"
                        >
                            {flagIcon("ua")}&nbsp;&nbsp;український</a>
                        <a href="#" onClick={() => {
                            i18n.changeLanguage("he");
                            setLangDropdownOpen(false);
                        }}
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                           role="menuitem"
                        >
                            {flagIcon("he")}&nbsp;&nbsp;עברית
                        </a>
                        <a href="#" onClick={() => {
                            i18n.changeLanguage("es");
                            setLangDropdownOpen(false);
                        }}
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                           role="menuitem"
                        >
                            {flagIcon("es")}&nbsp;&nbsp;Español
                        </a>
                    </div>
                </div>
            )}
        </div>
    </div>;
};