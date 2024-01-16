﻿import {atom, useAtomValue} from "jotai";

export const nameAtom = atom('');

export const familyNameAtom = atom('');
export const emailAtom = atom('');
export const idAtom = atom('');
export const countryAtom = atom('ישראל');
export const cityAtom = atom('');
export const streetAtom = atom('');
export const birthdateAtom = atom('');
export const isProcessingAtom = atom(false);

export const reverseNonHebrew = (str) => {
    const rtlLangCharsRegex = /[\u0590-\u05FF\u0621-\u064A]/;
    if (!rtlLangCharsRegex.test(str)) {
        //first split by "/" and then reverse each part
        const parts = str.split('/');
        return parts.map(part => part.split('').reverse().join('')).join('/');
    }
    return str;
}

export const useReverseNonHebrew = () => {
    const isProcessing = useAtomValue(isProcessingAtom);
    if (!isProcessing) return str=>str;
    return str => reverseNonHebrew(str);
}
    
const atomForRenderingAtom = (get,atom) => {
    const isProcessing = get(isProcessingAtom);
    const value = get(atom);
    if (!isProcessing) return value;
    return reverseNonHebrew(value);
};

export const nameAtomReversed = atom(get => atomForRenderingAtom(get,nameAtom) );
export const familyNameAtomReversed = atom(get => atomForRenderingAtom(get,familyNameAtom) );
export const emailAtomReversed = atom(get => atomForRenderingAtom(get,emailAtom) );
export const idAtomReversed = atom(get => atomForRenderingAtom(get,idAtom) );
export const countryAtomReversed = atom(get => atomForRenderingAtom(get,countryAtom) );
export const cityAtomReversed = atom(get => atomForRenderingAtom(get,cityAtom) );
export const streetAtomReversed = atom(get => atomForRenderingAtom(get,streetAtom) );
export const birthdateAtomReversed = atom(get => atomForRenderingAtom(get,birthdateAtom) );

export const isFormFilledAtom = atom(get => {
    const name = get(nameAtom);
    const familyName = get(familyNameAtom);
    // const email = get(emailAtom);
    const id = get(idAtom);
    const country = get(countryAtom);
    const city = get(cityAtom);
    const street = get(streetAtom);
    const birthdate = get(birthdateAtom);
    console.log({name, familyName,  id, country, city, street, birthdate})
    return !!(name && familyName &&  id && country && city && street && birthdate);
});