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

import 'react-toastify/dist/ReactToastify.css';
function App() {
    const templateRef = useRef();
    const [isFormFilled] = useAtom(isFormFilledAtom);
    const [, setIsProcessingAtom] = useAtom(isProcessingAtom);
    const [name]=useAtom(nameAtom);
    const [family]=useAtom(familyNameAtom);
    console.log({isFormFilled})
    //Todo: Add nicely formatted instructions:
    return (
        <div className="min-h-screen bg-gray-100 p-0 sm:p-12 flex justify-center flex-col items-center">
            <div className={"mb-5"}>
                Instructions:
                <ul className={"list-disc list-inside"}>
                    <li>Fill out the form below</li>
                    <li>Download the PDF</li>
                    <li>Click on the button to open an email to the WZO Office and attach the PDF</li>
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
                Download PDF
            </Button>
           
            <SubTitle>
                The email should be sent to the following addresses:
                <ul className={"list-disc list-inside"}>
                    <li>To: {["yaakovH!wzo.org.il", "yaakova!wzo.org.il", "gustiY!wzo.org.il", "reubensh!wzo.org.il"].join(";").replace(/!/g, "@")}</li>
                    <li>BCC: {"wzoelections!gmail.com".replace(/!/g, "@")}</li>
                    <li>Subject: WZO Registration Form - {name} {family}</li>
                    <li>Body: Please find attached the WZO Registration Form</li>
                    <li>Attach the PDF</li>
                </ul>
            </SubTitle>
            <Button
                disabled={!isFormFilled}
                onClick={() => {
                    //dont store the email addresses in the code so that they are not exposed in the public source code
                    const toAddresses = ["yaakovH!wzo.org.il", "yaakova!wzo.org.il", "gustiY!wzo.org.il", "reubensh!wzo.org.il"].join(",").replace(/!/g, "@");
                    const bccAddresses = "wzoelections!gmail.com".replace(/!/g, "@");
                    const subject = `WZO Registration Form - ${name} ${family}`;
                    const body = "Please find attached the WZO Registration Form";
                    const href = `mailto:${toAddresses}?subject=${subject}&body=${body}&bcc=${bccAddresses}`;
                    //create a link and click it
                    const link = document.createElement("a");
                    link.href = href;
                    link.click();
                    document.removeChild(link);
                }}>
                Compose Email to WZO Office
            </Button>
            <SubTitle>Dont forget to add the PDF as an attachment</SubTitle>
            <ToastContainer />
        </div>
    )
}

export default App
