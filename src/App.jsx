import React, {useRef, useState} from 'react'

import {InputForm} from "./InputForm.jsx";
import PdfTemplate from "./PdfTemplate.jsx";
import {Button, SubTitle, Title} from "./Inputs.jsx";
import jsPDF from "jspdf";
import {y} from './david1.js'
import {x} from './david2.js'
import {useAtom} from "jotai";
import {isFormFilledAtom, isProcessingAtom} from "./atoms.js";


function App() {
    const templateRef = useRef();
    const [isFormFilled] = useAtom(isFormFilledAtom);
    const [, setIsProcessingAtom] = useAtom(isProcessingAtom);
    console.log({isFormFilled})
    return (
        <div className="min-h-screen bg-gray-100 p-0 sm:p-12 flex justify-center flex-col items-center">
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
            <Button
                disabled={!isFormFilled}
                onClick={() => {
                    //dont store the email addresses in the code so that they are not exposed in the public source code
                    const toAddresses = ["YaakovH!wzo.org.il", "Yaakova!wzo.org.il", "GustiY!wzo.org.il", "ReubenSh!wzo.org.il"].join(";").replace(/!/g, "@");
                    const bccAddresses = "Wzoelections!gmail.com".replace(/!/g, "@"); 
                    const subject = "WZO Registration Form";
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

        </div>
    )
}

export default App
