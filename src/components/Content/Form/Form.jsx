import React, {useState} from "react";
import classes from '../Form/Form.module.css';
import moment from "moment";

const {
    chooseCoefficientSpeed,
    calculatePrice,
    calculateWorkDuration,
    calculateResultDate,
} = require('../../../calculateResultDate');


const Form = () => {
    const [numChars, setNumChars] = useState(0);
    const handleChange = (e) => {
        setNumChars(e.target.value.length);
    }

    const [language, setLanguage] = useState(null);
    const handleChangeLanguage = (e) => {
        setLanguage(e.target.value);
    }

    const info = chooseCoefficientSpeed(language);
    const durationMs = calculateWorkDuration(numChars, info.speed, '');
    const deadline = calculateResultDate(+new Date(), durationMs);
    const price = calculatePrice(Math.max(1000, numChars), language, info.coefficient, '');

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
                                      value="uk" onChange={handleChangeLanguage}/> Українська</label>
                        <label><input type="radio" name="lang"
                                      value="ru" onChange={handleChangeLanguage}/> Російська</label>
                        <label><input type="radio" name="lang"
                                      value="en" onChange={handleChangeLanguage}/> Англійська</label>
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
                        <div className={classes.price}>{numChars && !isNaN(price) ? price : '0.00'} грн</div>
                        {deadline &&
                        numChars ?
                            <div className={classes.time}>Термін
                                виконання: {moment(deadline).format('DD.MM.YY [о] HH:mm')}</div> : <br/>}
                    </div>
                    <button className={classes.button_order}>Замовити</button>
                </div>
            </div>
        </form>
    )
}

export default Form;