import './InputForm.css'
import jsPDF from 'jspdf';
import {atom, useAtom, useAtomValue} from "jotai";
import {
    birthdateAtom,
    cityAtom,
    countryAtom,
    emailAtom,
    familyNameAtom,
    idAtom,
    nameAtom,
    streetAtom
} from "./atoms.js";
import PdfTemplate from "./PdfTemplate.jsx";
import {useRef} from "react";
import {DateInput, DropdownInput, TextInput} from "./Inputs.jsx";


export const countryOptions = [
    {label: "ישראל", value: "ישראל"},
]

export const InputForm = () => {
    return (<div>

        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
            <h1 className="text-2xl font-bold mb-8">Wizo Registration Form</h1>
            <form id="form" noValidate>
                <TextInput label="First Name" name="name" atom={nameAtom}/>
                <TextInput label="Last Name" name="familyName" atom={familyNameAtom}/>
                <TextInput label="Email" name="email" type="email" atom={emailAtom}/>
                <TextInput label="Id" name="id" type="text" atom={idAtom}/>
                {/*country city street*/}
                <DropdownInput label="Country" name="country" atom={countryAtom} options={countryOptions}/>
                <TextInput label="City" name="city" type="text" atom={cityAtom}/>
                <TextInput label="Street" name="street" type="text" atom={streetAtom}/>
                <DateInput label="Birthdate" name="birthdate" atom={birthdateAtom}/>
            </form>
        </div>
    </div>);
};