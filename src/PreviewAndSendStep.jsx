import PdfTemplate from "./PdfTemplate.jsx";
import {Button, SubTitle} from "./Inputs.jsx";
import jsPDF from "jspdf";
import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import {familyNameAtom, isProcessingAtom, nameAtom} from "./atoms.js";
import {useAtom} from "jotai";

export const PreviewAndSendStep = ({isActive}) => {
    const templateRef = useRef();
    const [isProcessing, setIsProcessingAtom] = useAtom(isProcessingAtom);
    const [name] = useAtom(nameAtom);
    const [family] = useAtom(familyNameAtom);
    const {t, i18n} = useTranslation();
    if (!isActive) return null;
    return <div>
        {/*This is rendered twice: once as preview and once as a pdf*/}
        <div className={"opacity-0 absolute"}>
            <PdfTemplate templateRef={templateRef} isPdfRenderer={true}/>
        </div>
        <div className={"max-w-screen-sm"}>
            <PdfTemplate isPdfRenderer={false}/>
        </div>


        <Button
            onClick={() => {
                const doc = new jsPDF({
                    orientation: "portrait",
                    unit: "px",
                    format: "a3",
                });
                doc.setFontSize(10);
                doc.setFont("Arimo", "normal");
                setIsProcessingAtom(true);
                if (i18n.language === "he") {
                    doc.setR2L(true);
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
            <span className={"flex items-center w-full justify-center gap-2"}>
            {t("button.download-pdf")}
                {isProcessing ?
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : null}
            </span>
            
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
            disabled={isProcessing}
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
            }}>
            {t("email.send-button")}
        </Button>
        <SubTitle>{t("instruction.remindPdf")}</SubTitle>
    </div>
        ;
}