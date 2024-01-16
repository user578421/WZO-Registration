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
    idAtom, idAtomReversed,
    nameAtom, nameAtomReversed,
    streetAtom,
    streetAtomReversed, useReverseHebrew
} from "./atoms.js";

const PdfTemplate = ({templateRef}) => {
    const [name] = useAtom(nameAtomReversed);
    const [family] = useAtom(familyNameAtomReversed);
    const [birthdate] = useAtom(birthdateAtomReversed);
    const [id] = useAtom(idAtomReversed);
    const [country] = useAtom(countryAtomReversed);
    const [city] = useAtom(cityAtomReversed);
    const [street] = useAtom(streetAtomReversed);
    
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
    
    const placeholder = (value) => value ? <span style={styles.filled}>{value}</span> : '______________________';
    const f = useReverseHebrew();
    return (
        <div style={{
            margin:"auto",
            maxWidth: '18cm',
            minWidth: '18cm',
            overflow: 'scroll',
         
        }}>
            <div style={styles.page} ref={templateRef}>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <div style={styles.fullWidth}>
                            <div style={styles.marginb0}>
                                <h1 style={styles.marginb0}>{f('לכבוד:')}</h1>
                                <h1 style={styles.marginb0}>{f('ההסתדרות הציונית העולמית')}</h1>
                                <h1 style={styles.marginb0}>{f('ירושלים')}</h1>
                            </div>
                            <div style={styles.marginb0}>
                                <h1 style={styles.marginb0}>{f('בקשה להצטרף להסתדרות הציונית העולמית')}</h1>
                            </div>
                            <div style={styles.marginb0}>
                                <h1 style={styles.marginb0}>{f('בהתאם לסעיף 5 לחוקת ההסתדרות הציונית העולמית, ובהתאם לתקנה 1א לתקנות חוקת ההסתדרות הציונית העולמית, אני מבקש בזאת להצטרף כחבר בהסתדרות הציונית העולמית.')}</h1>
                            </div>
                        </div>
                        <div style={styles.fullWidth}>
                            <div style={styles.marginb0}>
                                <h1 style={styles.marginb0}>{f('להלן פרטיי האישיים בהתאם לתקנה 1א(ג) לתקנות החוקה:')}</h1>
                            </div>
                            <div style={styles.marginb0}>
                                <h1 style={styles.marginb0}>{f('שם פרטי')} {placeholder(name)}</h1>
                                <h1 style={styles.marginb0}>{f('שם משפחה')} {placeholder(family)}</h1>                                 
                                <h1 style={styles.marginb0}>{f('תאריך לידה')} {placeholder(birthdate)}</h1>
                                <h1 style={styles.marginb0}>{f('מספר זיהות')} {placeholder(id)}</h1>
                                <h1 style={styles.marginb0}>{f('ארץ מגוריי הקבועה היא')} {placeholder(country)}</h1>
                                <h1 style={styles.marginb0}>{f('בעיר')} {placeholder(city)}</h1>
                                <h1 style={styles.marginb0}>{f('ברחוב')} {placeholder(street)}</h1>
                            </div>

                        </div>
                        <div style={styles.fullWidth}>
                            <div style={styles.marginb0}>
                                <h1 style={styles.marginb0}>{f('אני מסכים לשימושים שיעשו במידע שנאסף לעיל בהתאם לכללי ה-GDPR החלים, ככל שחלים, במדינת מגוריי הקבועה.')}</h1>
                            </div>
                            <div style={styles.marginb0}>
                                <h1 style={styles.marginb0}>{f('אני מבקש להצטרף כחבר להסתדרות הציונית העולמית ואני מקבל על עצמי את "תכנית ירושלים".')}</h1>
                            </div>

                        </div>
                        <div style={styles.fullWidth}>
                            <div style={styles.marginb0}>
                                <h1 style={styles.marginb0}>{f('תאריך')} {placeholder(new Date().toLocaleDateString())}</h1>
                                <h1 style={styles.marginb0}>{f('חתימה')} {placeholder(name)}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfTemplate;