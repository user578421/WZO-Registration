import React, {useRef} from 'react';

import {InputForm} from "./InputForm.jsx";
import PdfTemplate from "./PdfTemplate.jsx";
import {Button, SubTitle} from "./Inputs.jsx";
import jsPDF from "jspdf";
import {useAtom} from "jotai";
import {familyNameAtom, isFormFilledAtom, isProcessingAtom, nameAtom} from "./atoms.js";
import {ToastContainer} from "react-toastify";
import {useTranslation} from "react-i18next";
import './i18n.js';

import 'react-toastify/dist/ReactToastify.css';
import {LanguageSwitcher} from "./LanguageSwitcher.jsx";

function App() {
    const templateRef = useRef();
    const [isFormFilled] = useAtom(isFormFilledAtom);
    const [, setIsProcessingAtom] = useAtom(isProcessingAtom);
    const [name] = useAtom(nameAtom);
    const [family] = useAtom(familyNameAtom);
    const {t, i18n} = useTranslation();



    return (
        <div
            className="min-h-screen bg-gray-100 p-0 sm:p-12 flex justify-center flex-col items-center"
            dir={i18n.dir()}
        >
            <LanguageSwitcher/>
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
