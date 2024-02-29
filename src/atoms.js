import {atom, useAtomValue} from "jotai";

export const nameAtom = atom('');

export const familyNameAtom = atom('');
export const emailAtom = atom('');
export const idAtom = atom('');
export const countryAtom = atom('');
export const cityAtom = atom('');
export const streetAtom = atom('');
export const birthdateAtom = atom('');
export const isProcessingAtom = atom(false);
export const isProcessingHebrewAtom = atom(false);
export const signaturePadAtom = atom(null);
export const signatureAtom = atom(null);

export const wizardStepAtom = atom(0);

export const reverseNonHebrew = (str) => {
    return str;
    const rtlLangCharsRegex = /[\u0590-\u05FF\u0621-\u064A]/;
    if (!rtlLangCharsRegex.test(str)) {
        //reverse each word in place - using the following seperaters: " " and "/"
        const words = str.split(/(\/|\s|\b)/);
        return words.map(word => word.split('').reverse().join(''));
    }
    return str;
}

export const useReverseNonHebrew = () => {
    const isProcessing = useAtomValue(isProcessingHebrewAtom);
    if (!isProcessing) return str => str;
    return str => reverseNonHebrew(str);
}

const atomForRenderingAtom = (get, atom) => {
    // const isProcessing = get(isProcessingHebrewAtom);
    const value = get(atom);
    return value;
    // if (!isProcessing) return value;
    // return reverseNonHebrew(value);
};

export const nameAtomReversed = atom(get => atomForRenderingAtom(get, nameAtom));
export const familyNameAtomReversed = atom(get => atomForRenderingAtom(get, familyNameAtom));
export const emailAtomReversed = atom(get => atomForRenderingAtom(get, emailAtom));
export const idAtomReversed = atom(get => atomForRenderingAtom(get, idAtom));
export const countryAtomReversed = atom(get => atomForRenderingAtom(get, countryAtom));
export const cityAtomReversed = atom(get => atomForRenderingAtom(get, cityAtom));
export const streetAtomReversed = atom(get => atomForRenderingAtom(get, streetAtom));
export const birthdateAtomReversed = atom(get => atomForRenderingAtom(get, birthdateAtom));
