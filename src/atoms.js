import {atom, useAtomValue} from "jotai";
import i18n from "i18next";

export const nameAtom = atom('');

export const familyNameAtom = atom('');
export const emailAtom = atom('');
export const idAtom = atom('');
export const countryAtom = atom('');
export const cityAtom = atom('');
export const streetAtom = atom('');
export const birthdateAtom = atom('');
export const isProcessingAtom = atom(false);
export const signaturePadAtom = atom(null);
export const signatureAtom = atom(null);
export const reverseNonHebrew = (str) => {
    const rtlLangCharsRegex = /[\u0590-\u05FF\u0621-\u064A]/;
    if (!rtlLangCharsRegex.test(str)) {
        //reverse each word in place - using the following seperaters: " " and "/"
        const words = str.split(/(\/|\s|\b)/);
        return words.map(word => word.split('').reverse().join(''));
    }
    return str;
}

export const useReverseNonHebrew = () => {
    const isProcessing = useAtomValue(isProcessingAtom);
    if (!isProcessing) return str => str;
    return str => reverseNonHebrew(str);
}

const atomForRenderingAtom = (get, atom) => {
    const isProcessing = get(isProcessingAtom);
    const value = get(atom);
    if (!isProcessing) return value;
    return reverseNonHebrew(value);
};

export const nameAtomReversed = atom(get => atomForRenderingAtom(get, nameAtom));
export const familyNameAtomReversed = atom(get => atomForRenderingAtom(get, familyNameAtom));
export const emailAtomReversed = atom(get => atomForRenderingAtom(get, emailAtom));
export const idAtomReversed = atom(get => atomForRenderingAtom(get, idAtom));
export const countryAtomReversed = atom(get => atomForRenderingAtom(get, countryAtom));
export const cityAtomReversed = atom(get => atomForRenderingAtom(get, cityAtom));
export const streetAtomReversed = atom(get => atomForRenderingAtom(get, streetAtom));
export const birthdateAtomReversed = atom(get => atomForRenderingAtom(get, birthdateAtom));

export const isFormFilledAtom = atom(get => {
    const name = get(nameAtom);
    const familyName = get(familyNameAtom);
    // const email = get(emailAtom);
    let id = get(idAtom);
    const country = get(countryAtom);
    const city = get(cityAtom);
    const street = get(streetAtom);
    const birthdate = get(birthdateAtom);
    const signature = get(signatureAtom);
    //if language is russian, we don't need to check the id
    if (i18n.language === 'ru') {
        id = true;
    }
    console.log({name, familyName, id, country, city, street, birthdate})
    return !!(name && familyName && country && city && street && birthdate && signature);
});