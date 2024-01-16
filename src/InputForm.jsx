import './InputForm.css'
import {atom, useAtom, useAtomValue} from "jotai";


const TextInput = ({label, name, type = "text", atom}) => {
    const [value, setValue] = useAtom(atom)
    return (
        <div className="relative z-0 w-full mb-5">
            <input
                type={type}
                name={name}
                placeholder=" "
                required
                value={value}
                onChange={e => {
                    console.log('update', e.target.value, name)
                    return setValue(e.target.value);
                }}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label htmlFor="name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">{label}</label>
            <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
        </div>
    );
};


const RadioInput = ({label, name, options, atom}) => {
    const [value, setValue] = useAtom(atom)
    return (

        <fieldset className="relative z-0 w-full p-px mb-5">
            <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">{label}
            </legend>
            <div className="block pt-3 pb-2 space-x-4">
                {options.map((option, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name={name}
                            checked={value === option.value}
                            onChange={e => setValue(e.target.value)}
                            value={option.value}
                            className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                        />
                        {option.label}
                    </label>))}
            </div>
            <span className="text-sm text-red-600 hidden" id="error">Option has to be selected</span>
        </fieldset>);
};

const DateInput = ({label, name, atom}) => {
    const [value, setValue] = useAtom(atom)
    return (<div className="relative z-0 w-full mb-5">
        <input
            type="date"
            name={name}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder=" "
            required
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
        />
        <label htmlFor={name} className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">{label}</label>
        <span className="text-sm text-red-600 hidden" id="error">Date is required</span>
    </div>);
};


const DropdownInput = ({label, name, options,atom}) => {
    const [value, setValue] = useAtom(atom)
    return (<div className="relative z-0 w-full mb-5">
        <select
            name={name}
            value={value}
            onChange={e => setValue(e.target.value)}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
        >
            <option value="" selected disabled hidden></option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>))}
        </select>
        <label htmlFor={name} className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Select
            an
            option</label>
        <span className="text-sm text-red-600 hidden" id="error">Option has to be selected</span>
    </div>);
};

const Button = ({label, onClick}) => (<button
    id="button"
    type="button"
    className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
    onClick={onClick}
>
    {label}
</button>);

const nameAtom = atom('');
const familyNameAtom = atom('');
const emailAtom = atom('');
const idAtom = atom('');
const countryAtom = atom('');
const cityAtom = atom('');
const streetAtom = atom('');
const birthdateAtom = atom('');

const WrapField = ({label, atom})=>{
    const [value, setValue] = useAtom(atom)
    return (<div className="relative z-0 w-full mb-5">
        {label}
        <div className={"border-2 border-gray-300 focus:border-gray-300 focus:ring-black"}>
            {value ? value : "__________"}
        </div>
    </div>);
}
const TemplateSample = () => {
    
    //tailwind preserve whitespace-pre-wrap right to left
    const placeholder= v=>v?v:"__________";
    return (<div className={"text-2xl whitespace-pre-wrap"} style={{direction: "rtl"}}>
        לכבוד:<br/>
        ההסתדרות הציונית העולמית<br/>
        ירושלים<br/>
        <br/>
        בקשה להצטרף להסתדרות הציונית העולמית<br/>
        <br/>
        בהתאם לסעיף 5 לחוקת ההסתדרות הציונית העולמית, ובהתאם לתקנה 1א לתקנות חוקת ההסתדרות הציונית העולמית, אני
        מבקש<br/>
        בזאת להצטרף כחבר בהסתדרות הציונית העולמית.<br/>
        <br/>
        להלן פרטיי האישיים בהתאם לתקנה 1א(ג) לתקנות החוקה:<br/>
        <br/>
<WrapField label={"שם פרטי"} atom={nameAtom}/>
<WrapField label={"שם משפחה"} atom={familyNameAtom}/>
<WrapField label={"דואר אלקטרוני"} atom={emailAtom}/>
<WrapField label={"תעודת זהות"} atom={idAtom}/>
<WrapField label={"מדינת מגורים"} atom={countryAtom}/>
<WrapField label={"עיר מגורים"} atom={cityAtom}/>
<WrapField label={"רחוב מגורים"} atom={streetAtom}/>
<WrapField label={"תאריך לידה"} atom={birthdateAtom}/>
        <br/>

        אני מסכים לשימושים שיעשו במידע שנאסף לעיל בהתאם לכללי ה-GDPR החלים, ככל שחלים, במדינת מגוריי הקבועה.<br/>
        <br/>
        אני מבקש להצטרף כחבר להסתדרות הציונית העולמית ואני מקבל על עצמי את "תכנית ירושלים".<br/>

        תאריך {new Date().toLocaleDateString()}<br/> חתימה <br/>

        מצורפת בזאת הוראת תשלום לשם תשלום "השקל הציוני"
        `</div>);
}
export const InputForm = () => {
    
    return (<div>
        <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
            <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                <h1 className="text-2xl font-bold mb-8">Form With Floating Labels</h1>
                <form id="form" noValidate>

                    <TextInput label="First Name" name="name" atom={nameAtom}/>
                    <TextInput label="Last Name" name="familyName" atom={familyNameAtom}/>
                    <TextInput label="Email" name="email" type="email" atom={emailAtom}/>
                    <TextInput label="Id" name="id" type="text" atom={idAtom}/>
                    {/*country city street*/}
                    <TextInput label="Country" name="country" type="text" atom={countryAtom}/>
                    <TextInput label="City" name="city" type="text" atom={cityAtom}/>
                    <TextInput label="Street" name="street" type="text" atom={streetAtom}/>
                    <DateInput label="Birthdate" name="birthdate" atom={birthdateAtom}/>
                    <TemplateSample/>
                    

                    
                </form>
            </div>
        </div>
    </div>);
};