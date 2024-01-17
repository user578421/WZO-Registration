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
import {DateInput, DropdownInput, SignatureInput, TextInput} from "./Inputs.jsx";

export const countryOptions = [
    {value: "France", label: "France"},
    {value: "Uruguay", label: "Uruguay"},
    {value: "Argentina", label: "Argentina"},
    {value: "Venezuela", label: "Venezuela"},
    {value: "Mexico", label: "Mexico"},
    {value: "Peru", label: "Peru"},
    {value: "Chile", label: "Chile"},
    {value: "Colombia", label: "Colombia"},
    {value: "Belgium", label: "Belgium"},
    {value: "Austria", label: "Austria"},
    {value: "Germany", label: "Germany"},
    {value: "Denmark", label: "Denmark"},
    {value: "Ukraine", label: "Ukraine"},
    {value: "Hungary", label: "Hungary"},
    {value: "Russia", label: "Russia"},
    {value: "South Africa", label: "South Africa"},
    {value: "Italy", label: "Italy"},
    {value: "Brazil", label: "Brazil"},
    {value: "Australia", label: "Australia"},
    {value: "Costa Rica", label: "Costa Rica"},
]

export const InputForm = () => {
    return (<div>

        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
            <h1 className="text-2xl font-bold mb-8">WZO Registration Form</h1>
            <form id="form" noValidate>
                <TextInput label="First Name" name="name" atom={nameAtom}/>
                <TextInput label="Last Name" name="familyName" atom={familyNameAtom}/>
                {/*<TextInput label="Email" name="email" type="email" atom={emailAtom}/>*/}
                <TextInput label="Id" name="id" type="text" atom={idAtom}/>
                {/*country city street*/}
                <DropdownInput label="Country" name="country" atom={countryAtom} options={countryOptions}/>
                <TextInput label="City" name="city" type="text" atom={cityAtom}/>
                <TextInput label="Street" name="street" type="text" atom={streetAtom}/>
                <DateInput label="Birthdate" name="birthdate" atom={birthdateAtom}/>
                <SignatureInput label="Signature" name="signature"/>
            </form>
        </div>
    </div>);
};