import React, {useRef, useState} from 'react'

import {InputForm} from "./InputForm.jsx";
import PdfTemplate from "./PdfTemplate.jsx";
import {Button, SubTitle, Title} from "./Inputs.jsx";
import jsPDF from "jspdf";
import 'src/incl/David-normal.js'
import 'src/incl/David-bold.js'
import {useAtom} from "jotai";
import {isFormFilledAtom} from "./atoms.js";


function App() {
    const templateRef = useRef();
const [isFormFilled] = useAtom(isFormFilledAtom);
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
                doc.html(templateRef.current, {
                    async callback(doc) {
                        await doc.save("registration.pdf");
                    }
                });
            }}
            >
                Download PDF
            </Button>
            <Button
                disabled={!isFormFilled}    
                onClick={() => {
                const toAddresses = ["wizo@wizo.com","wizo2@wizo.com"];
                const subject = "WIZO Registration Form";
                const body = "Please find attached the WIZO Registration Form";
                const href = `mailto:${toAddresses}?subject=${subject}&body=${body}`;
                //create a link and click it
                const link = document.createElement("a");
                link.href = href;
                link.click();
                document.removeChild(link);
            }} >
                Compose Email to WIZO Office
            </Button>
            <SubTitle>Dont forget to add the PDF as an attachment</SubTitle>

        </div>
    )
}

export default App
