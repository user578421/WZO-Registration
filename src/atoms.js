import {atom} from "jotai";

export const nameAtom = atom('');
export const familyNameAtom = atom('');
export const emailAtom = atom('');
export const idAtom = atom('');
export const countryAtom = atom('');
export const cityAtom = atom('');
export const streetAtom = atom('');
export const birthdateAtom = atom('');

export const isFormFilledAtom = atom(get => {
    const name = get(nameAtom);
    const familyName = get(familyNameAtom);
    const email = get(emailAtom);
    const id = get(idAtom);
    const country = get(countryAtom);
    const city = get(cityAtom);
    const street = get(streetAtom);
    const birthdate = get(birthdateAtom);
    console.log({name, familyName, email, id, country, city, street, birthdate})
    return !!(name && familyName && email && id && country && city && street && birthdate);
});