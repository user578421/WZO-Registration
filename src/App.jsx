import React, {useRef, useState} from 'react'

import {InputForm} from "./InputForm.jsx";
import PdfTemplate from "./PdfTemplate.jsx";
import {Button, SubTitle, Title} from "./Inputs.jsx";
import jsPDF from "jspdf";
import {y} from './david1.js'
import {x} from './david2.js'
import {useAtom} from "jotai";
import {familyNameAtom, isFormFilledAtom, isProcessingAtom, nameAtom} from "./atoms.js";
import {ToastContainer} from "react-toastify";
import {useTranslation, Trans} from "react-i18next";
import './i18n.js';

import 'react-toastify/dist/ReactToastify.css';

const locales = {
    en: "English",
    fr: "Français",
    ru: "русский",
    ua: "український",
}

function App() {
    const templateRef = useRef();
    const [isFormFilled] = useAtom(isFormFilledAtom);
    const [, setIsProcessingAtom] = useAtom(isProcessingAtom);
    const [name] = useAtom(nameAtom);
    const [family] = useAtom(familyNameAtom);
    const {t, i18n} = useTranslation();
    console.log({isFormFilled, i18n})
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    // A neat Language switcher at the top right corner using tailwindcss with a dropdown menu
    // Highlight the current language
    // Langauges shold popout when the mouse hovers over the language button
    const flagIcon = (lang) => {
        return <span className="inline-flex items-center justify-center">
                                <img
                                    src={`https://flagcdn.com/16x12/${lang === "en" ? "us" : lang}.png`}
                                    alt={locales[lang]}/>
                            </span>
    }
    return (
        <div className="min-h-screen bg-gray-100 p-0 sm:p-12 flex justify-center flex-col items-center">
            <div className="flex justify-end w-full">
                <div className="relative inline-block text-left">
                    <div>
                        <button type="button"
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
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical"
                                 aria-labelledby="options-menu">
                                <a href="#" onClick={() => {
                                    i18n.changeLanguage("en");
                                    setLangDropdownOpen(false)
                                }}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                   role="menuitem">
                                    {flagIcon("en")}
                                    English
                                </a>
                                <a href="#" onClick={() => {
                                    i18n.changeLanguage("fr");
                                    setLangDropdownOpen(false)
                                }}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                   role="menuitem">
                                    {flagIcon("fr")}
                                    Français
                                </a>
                                <a href="#" onClick={() => {
                                    i18n.changeLanguage("ru");
                                    setLangDropdownOpen(false)
                                }}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                   role="menuitem">
                                    {flagIcon("ru")}
                                    русский</a>
                                <a href="#" onClick={() => {
                                    i18n.changeLanguage("ua");
                                    setLangDropdownOpen(false)
                                }}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                   role="menuitem">
                                    {flagIcon("ua")}
                                    український</a>
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
            <PdfTemplate templateRef={templateRef}/>
            <Button
                disabled={!isFormFilled}
                onClick={() => {
                    const doc = new jsPDF({
                        orientation: "portrait",
                        unit: "px",
                        format: "a3",
                    });
                    doc.setFont("David", "normal")
                    doc.setFontSize(10);
                    doc.setR2L(true)
                    setIsProcessingAtom(true)
                    setTimeout(() => {
                        doc.html(templateRef.current, {
                            async callback(doc) {
                                await doc.save("registration.pdf");
                            }
                        });
                        setIsProcessingAtom(false)
                    }, 1)
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
    )
}

export default App
