﻿import './InputForm.css';
import {useAtom} from "jotai";
import {
    birthdateAtom,
    cityAtom,
    countryAtom,
    familyNameAtom,
    idAtom,
    nameAtom,
    signatureAtom,
    streetAtom
} from "./atoms.js";
import {useMemo} from "react";
import {DateInput, DropdownInput, SignatureInput, TextInput} from "./Inputs.jsx";
import {useTranslation} from "react-i18next";

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
    {value: "Spain", label: "Spain"},
];

export const InputStep = ({isActive}) => {
    const {t, i18n} = useTranslation();
    const [country] = useAtom(countryAtom);

    const translatedCountryOptions = useMemo(() => countryOptions.map(({value, label}) => ({
        value,
        label: t(`country.${label}`),
    })), [i18n.language]);
    const requireId = !["Russia", "France"].includes(country);

    return (<div className={isActive ? "" : "opacity-0 absolute"}>
        <form id="form" noValidate>
            <TextInput label={t("input.firstName")} name="name" atom={nameAtom}/>
            <TextInput label={t("input.lastName")} name="familyName" atom={familyNameAtom}/>
            {/*<TextInput label="Email" name="email" type="email" atom={emailAtom}/>*/}
            {requireId ? <TextInput label={t("input.Id")} name="id" type="text" atom={idAtom}/> : null}
            <DropdownInput
                label={t("input.country")}
                name="country"
                atom={countryAtom}
                options={translatedCountryOptions}
            />
            <TextInput label={t("input.city")} name="city" type="text" atom={cityAtom}/>
            <TextInput label={t("input.street")} name="street" type="text" atom={streetAtom}/>
            <DateInput label={t("input.birthdate")} name="birthdate" atom={birthdateAtom}/>
            <SignatureInput label={t("input.signature")} name="signature" atom={signatureAtom}/>
        </form>

    </div>);
};