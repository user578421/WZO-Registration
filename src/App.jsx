import React, {useEffect, useRef, useState} from 'react';

import {InputForm} from "./InputForm.jsx";
import PdfTemplate from "./PdfTemplate.jsx";
import {Button, SubTitle} from "./Inputs.jsx";
import jsPDF from "jspdf";
import {a} from './Arimo-bold.js';
import {useAtom} from "jotai";
import {familyNameAtom, isFormFilledAtom, isProcessingAtom, nameAtom} from "./atoms.js";
import {ToastContainer} from "react-toastify";
import {useTranslation} from "react-i18next";
import './i18n.js';

import 'react-toastify/dist/ReactToastify.css';
import {useOnClickOutside} from "./useOnClickOutside.jsx";

const locales = {
    en: "English",
    fr: "Français",
    ru: "русский",
    ua: "український",
    he: "עברית",
    es: "Español",
};

function App() {
    const templateRef = useRef();
    const [isFormFilled] = useAtom(isFormFilledAtom);
    const [, setIsProcessingAtom] = useAtom(isProcessingAtom);
    const [name] = useAtom(nameAtom);
    const [family] = useAtom(familyNameAtom);
    const {t, i18n} = useTranslation();
    const languageDropdownRef = useRef();
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    useOnClickOutside(languageDropdownRef, () => {
        setLangDropdownOpen(false);
    }, []);

    useEffect(() => {
        //if language is not in the list of supported languages, default to english
        if (!Object.keys(locales).includes(i18n.language)) {
            i18n.changeLanguage("en");
        }
    }, [i18n.language]);

    const flagIcon = (lang) => {
        return <span className="inline-flex items-center justify-center">
                    <img
                        src={`https://flagcdn.com/16x12/${lang === "en" ? "us" : lang === "he" ? "il" : lang}.png`}
                        alt={locales[lang]}
                    />
                </span>;
    };
    return (
        <div
            className="min-h-screen bg-gray-100 p-0 sm:p-12 flex justify-center flex-col items-center"
            dir={i18n.dir()}
        >
            <div className={`flex absolute left-1/2 transform -translate-x-1/2 top-1.5`}>
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
            </div>
            <div className={"mb-5"}>
                {t("intructions-title")}
                <ul className={"list-disc list-inside"}>
                    <li>{t('instruction.fill-in-form')}</li>
                    <li>{t('instruction.download-pdf')}</li>
                    <li>{t("instruction.click")}</li>
                </ul>
            </div>
            <InputForm/>
            {/*This is rendered twice: once as preview and once as a pdf*/}
            <div className={"opacity-0 absolute"}>
                <PdfTemplate templateRef={templateRef} isPdfRenderer={true}/>
            </div>
            <div className={"max-w-screen-sm"}>
                <PdfTemplate isPdfRenderer={false}/>
            </div>
            <Button
                disabled={!isFormFilled}
                onClick={() => {
                    const doc = new jsPDF({
                        orientation: "portrait",
                        unit: "px",
                        format: "a3",
                    });
                    doc.setFontSize(10);
                    doc.setFont("Arimo", "normal");
                    if (i18n.language === "he") {
                        doc.setR2L(true);
                        setIsProcessingAtom(true);
                    }
                    setTimeout(() => {
                        doc.html(templateRef.current, {
                            async callback(doc) {
                                await doc.save("registration.pdf");
                            },
                        });
                        setIsProcessingAtom(false);
                    }, 1);
                }}
            >
                {t("button.download-pdf")}
            </Button>
            <SubTitle>
                {t('instruction.email')}
                <ul className={"list-disc list-inside"}>
                    <li>{t('instruction.emailTo')} {["yaakovH!wzo.org.il", "yaakova!wzo.org.il", "gustiY!wzo.org.il", "reubensh!wzo.org.il"].join(";").replace(/!/g, "@")}</li>
                    <li>{t('instruction.emailBcc')} {"wzoelections!gmail.com".replace(/!/g, "@")}</li>
                    <li>{t('instruction.emailSubject')} {`${t("email.subject")} ${name} ${family}`}</li>
                    <li>{t('instruction.emailBody')} {t("email.body")}</li>
                    <li>{t('instruction.emailAttach')}</li>
                </ul>
            </SubTitle>
            <Button
                disabled={!isFormFilled}
                onClick={() => {
                    //dont store the email addresses in the code so that they are not exposed in the public source code
                    const toAddresses = ["yaakovH!wzo.org.il", "yaakova!wzo.org.il", "gustiY!wzo.org.il", "reubensh!wzo.org.il"].join(",").replace(/!/g, "@");
                    const bccAddresses = "wzoelections!gmail.com".replace(/!/g, "@");
                    const subject = `${t("email.subject")} ${name} ${family}`;
                    const body = t("email.body");
                    const href = `mailto:${toAddresses}?subject=${subject}&body=${body}&bcc=${bccAddresses}`;
                    //create a link and click it
                    const link = document.createElement("a");
                    link.href = href;
                    link.click();
                    document.removeChild(link);
                }}>
                {t("email.send-button")}
            </Button>
            <SubTitle>{t("instruction.remindPdf")}</SubTitle>
            <ToastContainer/>
        </div>
    );
}

export default App;
