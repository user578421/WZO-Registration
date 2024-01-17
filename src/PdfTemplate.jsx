// const hebrewTemplate = `לכבוד:
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

const PdfTemplate = ({templateRef}) => {
    const [name] = useAtom(nameAtomReversed);
    const [family] = useAtom(familyNameAtomReversed);
    const [birthdate] = useAtom(birthdateAtomReversed);
    const [id] = useAtom(idAtomReversed);
    const [country] = useAtom(countryAtomReversed);
    const [city] = useAtom(cityAtomReversed);
    const [street] = useAtom(streetAtomReversed);
    const [signature] = useAtom(signatureAtom);

    const styles = {
        page: {
            overflow: 'hidden',
            marginLeft: '5rem',
            marginRight: '5rem',
            'page-break-after': 'always',
            fontFamily: 'David',
            direction: 'rtl',
            textAlign: 'right',
        },

        columnLayout: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '3rem 0 5rem 0',
            gap: '2rem',
        },

        column: {
            display: 'flex',
            flexDirection: 'column',
        },

        spacer2: {
            height: '2rem',
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
    const f = s => s;
    return (
        <div style={{
            margin: "auto",
            maxWidth: '18cm',
            minWidth: '18cm',
            overflow: 'scroll',
            // opacity: 0,
            // height: 0,
        }}>
            <div style={styles.page} ref={templateRef}>
                <div style={styles.columnLayout} className={"text-sm"}>
                    <div style={styles.column} className={"leading-5"}>
                        <div style={styles.fullWidth} className={"mb-5"}>
                            <div className={"mb-5 "}>
                                <h1 className={"font-bold"}>{f('לכבוד:')}</h1>
                                <h1 className={""}>{f('ההסתדרות הציונית העולמית')}</h1>
                                <h1 className={""}>{f('ירושלים')}</h1>
                            </div>
                            <div className={"underline text-center font-bold mb-5"}>
                                <h1 className={""}>{f('בקשה להצטרף להסתדרות הציונית העולמית')}</h1>
                            </div>
                            <div className={""}>
                                <h1 className={""}>{f('בהתאם לסעיף 5 לחוקת ההסתדרות הציונית העולמית, ובהתאם לתקנה 1א לתקנות חוקת ההסתדרות הציונית העולמית, אני מבקש בזאת להצטרף כחבר בהסתדרות הציונית העולמית.')}</h1>
                            </div>
                        </div>
                        <div style={styles.fullWidth} className={"mb-5"}>
                            <div className={"mb-5"}>
                                <h1 className={""}>{f('להלן פרטיי האישיים בהתאם לתקנה 1א(ג) לתקנות החוקה:')}</h1>
                            </div>
                            <div className={""}>
                                <h1 className={""}><span
                                    className={"font-bold"}>{f('שם פרטי')}</span> {placeholder(name)}</h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{f('שם משפחה')}</span> {placeholder(family)}</h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{f('תאריך לידה')}</span> {placeholder(birthdate)}</h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{f('מספר זיהות')}</span> {placeholder(id)}</h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{f('ארץ מגוריי הקבועה היא')}</span> {placeholder(country)}
                                </h1>
                                <h1 className={""}><span className={"font-bold"}>{f('בעיר')}</span> {placeholder(city)}
                                </h1>
                                <h1 className={""}><span
                                    className={"font-bold"}>{f('ברחוב')}</span> {placeholder(street)}</h1>
                            </div>

                        </div>
                        <div style={styles.fullWidth}>
                            <div className={"mb-5"}>
                                <h1 className={""}>{f(`אני מסכים לשימושים שיעשו במידע שנאסף לעיל בהתאם לכללי ה-${renderedGDPR} החלים, ככל שחלים, במדינת מגוריי הקבועה.`)}</h1>
                            </div>
                            <div className={"mb-5"}>
                                <h1 className={""}>{f('אני מבקש להצטרף כחבר להסתדרות הציונית העולמית ואני מקבל על עצמי את "תכנית ירושלים".')}</h1>
                            </div>
                            <div className={"mb-5"}>
                                <h1 className={""}>{f('אני מתחייב באופן בלתי חוזר ונותן בזאת הוראת תשלום לשלם את "השקל הציוני" בשיעורים ובדרכים שתורה לי ההסתדרות הציונית העולמית')}</h1>
                            </div>
                        </div>
                        <div style={styles.fullWidth}>
                            <div className={"flex justify-between"}>
                                <h1 className={""}><span
                                    className={"font-bold"}>{f('תאריך')}</span> {placeholder(renderedDate)}
                                </h1>
                            </div>
                            <h1 className={""}><span className={"font-bold"}>{f('חתימה')}</span></h1>
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