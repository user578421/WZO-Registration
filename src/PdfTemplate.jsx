﻿// const hebrewTemplate = `לכבוד:
// ההסתדרות הציונית העולמית
// ירושלים
// 
// בקשה להצטרף להסתדרות הציונית העולמית
// 
// בהתאם לסעיף 5 לחוקת ההסתדרות הציונית העולמית, ובהתאם לתקנה 1א לתקנות חוקת ההסתדרות הציונית העולמית, אני מבקש בזאת להצטרף כחבר בהסתדרות הציונית העולמית.
// 
// להלן פרטיי האישיים בהתאם לתקנה 1א(ג) לתקנות החוקה:
// 
// שם פרטי ${name} שם משפחה ${family} תאריך לידה ${birthdate} מספר זיהוי ${id} ארץ מגוריי הקבועה היא ${country} בעיר ${city} ברחוב ${street}
// 
// 
// אני מסכים לשימושים שיעשו במידע שנאסף לעיל בהתאם לכללי ה-GDPR החלים, ככל שחלים, במדינת מגוריי הקבועה.
// 
// אני מבקש להצטרף כחבר להסתדרות הציונית העולמית ואני מקבל על עצמי את "תכנית ירושלים".
// 
// תאריך ${new Date().toLocaleDateString()} חתימה ${name}
// 
// מצורפת בזאת הוראת תשלום לשם תשלום "השקל הציוני"`

import {useAtom} from "jotai";
import {
    birthdateAtom, birthdateAtomReversed,
    cityAtom, cityAtomReversed,
    countryAtom, countryAtomReversed,
    familyNameAtom, familyNameAtomReversed,
    idAtom, idAtomReversed, isProcessingAtom,
    nameAtom, nameAtomReversed, reverseNonHebrew, signatureAtom,
    streetAtom,
    streetAtomReversed
} from "./atoms.js";
import {useTranslation} from "react-i18next";

const PdfTemplate = ({templateRef}) => {
    const [name] = useAtom(nameAtomReversed);
    const [family] = useAtom(familyNameAtomReversed);
    const [birthdate] = useAtom(birthdateAtomReversed);
    const [id] = useAtom(idAtomReversed);
    const [country] = useAtom(countryAtomReversed);
    const [city] = useAtom(cityAtomReversed);
    const [street] = useAtom(streetAtomReversed);
    const [signature] = useAtom(signatureAtom);
    const {t, i18n} = useTranslation();

    const styles = {
        page: {
            overflow: 'hidden',
            marginLeft: '1rem',
            marginRight: '1rem',
            pageBreakAfter: 'always',
            fontFamily: 'Arimo',
            direction: i18n.language === 'he' ? 'rtl' : 'ltr',
            textAlign: i18n.language === 'he' ? 'right' : 'left',
        },

        columnLayout: {
            display: 'flex',
            justifyContent: 'space-between',
        },

        column: {
            display: 'flex',
            flexDirection: 'column',
        },

        fullWidth: {
            width: "100%",
        },

        marginb0: {
            marginBottom: 0,
        },

        filled: {
            fontWeight: 'bold',
            textDecoration: 'underline',
        },
    };

    const placeholder = (value) => value ? <span>{value}</span> : '______________________';
    const [isProcessing] = useAtom(isProcessingAtom)
    const localDate = (() => {
        //format date as dd/MM/yyyy
        const n = new Date();
        const y = n.getFullYear();
        const m = n.getMonth() + 1;
        const d = n.getDate();
        return `${d}/${m}/${y}`;
    })();
    const renderedDate = isProcessing ? reverseNonHebrew(localDate) : localDate;
    console.log({renderedDate, localDate, isProcessing})
    const renderedGDPR = isProcessing ? reverseNonHebrew("GDPR") : "GDPR";
    return (
        <div style={{
            margin: "auto",
            maxWidth: '18cm',
            minWidth: '18cm',
            overflow: 'auto',
            // opacity: 0,
            // height: 0,
        }}>
            <div style={styles.page} ref={templateRef}>
                <div style={styles.columnLayout} className={"text-sm text-justify"}>
                    <div style={styles.column} className={""}>
                        <div style={styles.fullWidth} className={"mb-5"}>
                            <div className={"mb-5"}>
                                <h1 className={"font-bold"}>{t('pdf.lechavod')}</h1>
                                <h1 className={""}>{t('pdf.histadrut')}</h1>
                                <h1 className={""}>{t('pdf.jerusalem')}</h1>
                            </div>
                            <div className={"underline text-center font-bold mb-5"}>
                                <h1 className={""}>{t('pdf.subject')}</h1>
                            </div>
                            <div className={""}>
                                <h1 className={""}>{t('pdf.request')}</h1>
                            </div>
                        </div>
                        <div style={styles.fullWidth} className={"mb-5"}>
                            <div className={"mb-5"}>
                                <h1 className={""}>{t('pdf.details-intro')}</h1>
                            </div>
                            <div className={""}>
                                <h1 className={""}><span
                                    className={"font-bold"}>{t('pdf.firstname')}</span> {placeholder(name)}</h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{t('pdf.lastname')}</span> {placeholder(family)}</h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{t('pdf.birthdate')}</span> {placeholder(birthdate)}</h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{t('pdf.id')}</span> {placeholder(id)}</h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{t('pdf.country')}</span> {placeholder(country)}
                                </h1>
                                <h1 className={""}><span className={"font-bold"}>{t('pdf.city')}</span> {placeholder(city)}
                                </h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{t('pdf.street')}</span> {placeholder(street)}</h1>
                            </div>

                        </div>
                        <div style={styles.fullWidth}>
                            <div className={"mb-5"}>
                                <h1 className={""}>{t(`pdf.gdpr`,{gdpr:renderedGDPR})}</h1>
                            </div>
                            <div className={"mb-5"}>
                                <h1 className={""}>{t('pdf.join')}</h1>
                            </div>
                            <div className={"mb-5"}>
                                <h1 className={""}>{t('pdf.commitment')}</h1>
                            </div>
                        </div>
                        <div style={styles.fullWidth}>
                            <div className={"flex justify-between"}>
                                <h1 className={""}><span
                                    className={"font-bold"}>{t('pdf.date')}</span> {placeholder(renderedDate)}
                                </h1>
                            </div>
                            <h1 className={""}><span className={"font-bold"}>{t('pdf.signed')}</span></h1>
                            {placeholder(signature ? <img src={signature} style={{width: '400px', padding: 5}}
                                                          alt={`${name} ${family}`}/> : null)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfTemplate;