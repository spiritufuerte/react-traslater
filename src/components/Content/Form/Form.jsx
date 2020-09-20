import React, {useState} from "react";
import classes from '../Form/Form.module.css';
import moment from "moment";


const Form = () => {
    const [numChars, setNumChars] = useState(0);
    const handleChange = (e) => {
        setNumChars(e.target.value.length);
    }

    const [language, setLanguage] = useState(null);
    const handleChangeLanguage = (e) => {
        setLanguage(e.target.value);
    }

    let price;
    let workingHours;
    switch (language) {
        case 'ukr':
        case 'rus':
            price = Math.max(50, 0.05 * numChars);
            workingHours = numChars / 1333;
            break;
        case 'ang':
            price = Math.max(120, 0.12 * numChars);
            workingHours = numChars / 333;
            break;
        default:
            price = 0;
            break;
    }
    const minutes = 30 + Math.max(1, workingHours) * 60;
    let roundedMinutes = minutes + (minutes % 30 === 0 ? 0 : 30 - minutes % 30);
    const date = moment();
    let deadline;
    while (roundedMinutes > 0) {
        if (date.day() !== 0 && date.day() !== 6) {
            let startTime = date.clone().hours(10).minutes(0);
            if (moment().isAfter(startTime)) {
                startTime = moment();
            }
            let endTime = date.clone().hours(19).minutes(0);

            if (moment().isBefore(endTime)) {
                deadline = startTime.add(roundedMinutes, 'minutes');
                roundedMinutes = deadline.diff(endTime, 'minutes');
            }
        }

        date.add(1, 'day');
    }

    return (
        <form className={classes.form}>
            <div>
                <section className={classes.section}>
                    <div className={classes.section_block}>
                        <h3>ЗАМОВИТИ РЕДАГУВАННЯ</h3>
                        <p>Виправимо всі помилки, приберемо всі дурниці, перефразуємо невдалі місця, але сильно текст не
                            переписуватимемо. Зайвих виправлень не буде. <a href="/#">Детальніше про редагування</a></p>
                        <div className={classes.input_mail}><input className={classes.input_field} type='email'
                                                                   placeholder='Ваша ел.пошта'/></div>
                        <div className={classes.input_name}><input className={classes.input_field} type='text'
                                                                   placeholder='Ваше імя'/></div>
                        <div className={classes.text_area}>
                            <textarea onChange={handleChange} className={classes.text_area_field}
                                      placeholder="Уведіть або завантажте файл"></textarea>
                            <div className={classes.symbols}>{numChars ? numChars : ''}</div>
                        </div>
                    </div>
                </section>
                <section className={classes.section_lang}>
                    <div className={classes.section_lang_item}>
                        <legend className={classes.section_lang_title}><b>Мова</b></legend>
                        <label><input type="radio" name="lang"
                                      value="ukr" onChange={handleChangeLanguage} /> Українська</label>
                        <label><input type="radio" name="lang"
                                      value="rus" onChange={handleChangeLanguage} /> Російська</label>
                        <label><input type="radio" name="lang"
                                      value="ang" onChange={handleChangeLanguage} /> Англійська</label>
                    </div>
                </section>
                <section>
                    <div className={classes.input_comment}><input className={classes.input_field} type='text'
                                                                  placeholder='Стислий коментар або покликання'/>
                    </div>
                </section>
            </div>
            <div>
                <div className={classes.block_result_info}>
                    <div className={classes.block_info_text}>
                        <div className={classes.price}>{price.toFixed(2)} грн</div>
                        {deadline && <div className={classes.time}>Термін виконання: {deadline.format('DD.MM.YY [о] HH:mm')}</div>}
                    </div>
                    <button className={classes.button_order}>Замовити</button>
                </div>
            </div>
        </form>
    )
}

export default Form;