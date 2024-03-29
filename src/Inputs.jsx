﻿import {useAtom} from "jotai";
import {useEffect, useRef} from "react";
import SignaturePad from "signature_pad";
import {signatureAtom, signaturePadAtom} from "./atoms.js";
import {useTranslation} from "react-i18next";

export const TextInput = ({label, name, type = "text", atom}) => {
    const [value, setValue] = useAtom(atom);
    return (
        <div className="relative z-0 w-full mb-5">
            <input
                type={type}
                name={name}
                placeholder=" "
                required
                value={value}
                onChange={e => {
                    console.log('update', e.target.value, name);
                    return setValue(e.target.value);
                }}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label htmlFor="name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">{label}</label>
            <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
        </div>
    );
};


export const RadioInput = ({label, name, options, atom}) => {
    const [value, setValue] = useAtom(atom);
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

export const DateInput = ({label, name, atom}) => {
    const [value, setValue] = useAtom(atom);
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


export const DropdownInput = ({label, name, options, atom}) => {
    const [value, setValue] = useAtom(atom);
    return (<div className="relative z-0 w-full mb-5">
        <select
            name={name}
            defaultValue={""}
            onChange={e => {
                console.log('update', e.target.value, name);
                return setValue(e.target.value);
            }}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
        >
            <option value=""></option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
        <label htmlFor={name} className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">{label}</label>
        <span className="text-sm text-red-600 hidden" id="error">Option has to be selected</span>
    </div>);
};

export const Button = ({children, disabled, moreClassNames, ...rest}) => {
    return <button
        id="button"
        type="button"
        className={`w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
            ${moreClassNames}
        `}
        disabled={disabled}
        {...rest}
    >
        {children}
    </button>;
};

export const SignatureInput = ({label, name}) => {
    const [value, setValue] = useAtom(signatureAtom);
    const [signaturePad, setSignaturePad] = useAtom(signaturePadAtom);

    const canvasRef = useRef(null);
    const canvasRefPrev = useRef(null);
    useEffect(() => {
        console.log('useEffect', canvasRef.current, canvasRefPrev.current);
        if (canvasRef.current !== canvasRefPrev.current) {
            const canvas = canvasRef.current;
            //set canvas value based on atom
            // if (value) {
            //     const img = new Image();
            //     img.src = value;
            //     img.onload = () => {
            //         canvas.getContext('2d').drawImage(img, 0, 0);
            //     };
            // }
            const signaturePad = new SignaturePad(canvas, {
                backgroundColor: 'white',
                penColor: 'black',
                minWidth: 1,
                maxWidth: 1,
            });
            setSignaturePad(signaturePad);

            const afterStrokeHandler = (e) => {
                setValue(signaturePad.toDataURL());
            };
            signaturePad.addEventListener('endStroke', afterStrokeHandler);
            return () => {
                signaturePad.removeEventListener('endStroke', afterStrokeHandler);
            };
            canvasRefPrev.current = canvasRef.current;
        }
        
    }, [canvasRef.current]);

    const clear = () => {
        signaturePad?.clear();
        setValue(null);
    };

    const {t} = useTranslation();
    return (<div className="relative z-0 w-full flex flex-col items-center pt-5">
        <div className={"cursor-pointer"}>
            <canvas
                ref={canvasRef}
                width="300" height="100"
                className="border-2 border-gray-300"
            />
        </div>
        <div className="flex space-x-4 mt-2">
            <Button onClick={clear} moreClassNames={"text-pink-500 bg-pink-50 hover:bg-pink-100 text-base"}>
                {t("input.clear-signature")}
            </Button>
        </div>
        <div className={'text-start w-full'}>
            {/* The purpose of the input is in order to make the label render with transform to make it smaller */}
            <input type={'hidden'} name={name}/>
            <label htmlFor={name} className="absolute duration-300 top-3 z-1 origin-0 text-gray-500">{label}</label>
        </div>
        <span className="text-sm text-red-600 hidden" id="error">Signature is required</span>
    </div>);
};


export const Title = ({children}) => <h1 className="text-2xl font-bold mb-2 mt-2 w-1/10">{children}</h1>;
export const SubTitle = ({children}) => <h2 className="text-1xl font-bold mb-2 mt-2 w-1/10 break-words">
    {children}
</h2>;