import React, {useMemo} from 'react';

import {InputStep} from "./InputStep.jsx";
import {Button} from "./Inputs.jsx";
import {useAtom} from "jotai";
import {
    birthdateAtom,
    cityAtom,
    countryAtom,
    familyNameAtom,
    idAtom,
    nameAtom,
    signatureAtom,
    streetAtom,
    wizardStepAtom
} from "./atoms.js";
import {toast, ToastContainer} from "react-toastify";
import {useTranslation} from "react-i18next";
import './i18n.js';

import 'react-toastify/dist/ReactToastify.css';
import {LanguageSwitcher} from "./LanguageSwitcher.jsx";
import {PreviewAndSendStep} from "./PreviewAndSendStep.jsx";

function App() {
    const {t, i18n} = useTranslation();
    const [wizardStep, setWizardStep] = useAtom(wizardStepAtom)
    const [name] = useAtom(nameAtom);
    const [familyName] = useAtom(familyNameAtom);
    const [id] = useAtom(idAtom);
    const [country] = useAtom(countryAtom);
    const [city] = useAtom(cityAtom);
    const [street] = useAtom(streetAtom);
    const [birthdate] = useAtom(birthdateAtom);
    const [signature] = useAtom(signatureAtom);

    const missingFields = useMemo(() => {

        //if language is russian, we don't need to check the id
        const requireId = !["Russia", "France"].includes(country);

        const missingFields = [];
        if (!name) missingFields.push(t('input.firstName'));
        if (!familyName) missingFields.push(t('input.lastName'));
        if (!id && requireId) missingFields.push(t('input.Id'));
        if (!country) missingFields.push(t('input.country'));
        if (!city) missingFields.push(t('input.city'));
        if (!street) missingFields.push(t('input.street'));
        if (!birthdate) missingFields.push(t('input.birthdate'));
        if (!signature) missingFields.push(t('input.signature'));
        console.log('missingFields', missingFields);
        return missingFields;
    }, [i18n.language, name, familyName, id, country, city, street, birthdate, signature]);
    const toggleStepHandler = () => {
        if (wizardStep === 0) {
            if (missingFields.length > 0) {
                toast.error(t("error.missingFields", {missingFields: missingFields.join(", ")}));
            } else {
                setWizardStep(1)
            }
        } else {
            setWizardStep(0)
        }
    }

    return (
        <div
            className="min-h-screen bg-gray-100 p-4 sm:p-12 flex justify-center flex-col items-center"
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
            <div className="mx-auto max-w-full px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                <h1 className="text-2xl font-bold mb-8 text-center">{t("input.formTitle")}</h1>
                {wizardStep === 0 ? <InputStep/> : <PreviewAndSendStep/>}
            </div>
            <Button
                onClick={toggleStepHandler}>{wizardStep === 0 ? t("button.next") : t("button.back")}</Button>

            <ToastContainer/>
        </div>
    );
}

export default App;
