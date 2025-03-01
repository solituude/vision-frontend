import {useState} from "react";

import {Button} from "common/shared/button";

import s from './floatingComma.module.scss';

export const FloatingComma = () => {
    const value = 0;
    const [comma, setComma] = useState(1);
    return (
        <div className={s.comma__container}>
            <span className={s.comma__label}>Плавающая запятая</span>

            <div className={s.buttons__container}>
                <Button label={''}
                        disabled={comma <= 0}
                        className={'secondary'}
                        onClick={() => setComma(comma - 1)}
                        img={'arrow_left_outline_24'}
                        imgColor={'--icon-accent-themed'}/>
                <span className={s.comma__label}>{value.toFixed(comma)}</span>
                <Button label={''} className={'secondary'}
                        disabled={comma >= 5}
                        onClick={() => setComma(comma + 1)}
                        img={'arrow_right_outline_24'}
                        imgColor={'--icon-accent-themed'}/>
            </div>
        </div>
    )
}