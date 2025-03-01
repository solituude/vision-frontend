import {FC} from 'react';

import s from './checkbox.module.scss';

export type CheckboxPropsType = {
    showLabel?: boolean;
    checked?: boolean;
    onChecked?: () => void;
    label?: string;
}

export const Checkbox: FC<CheckboxPropsType> = (props) => {
    return (
        <div className={s.container_checkbox}>
            <input type="checkbox" checked={props.checked} onChange={props.onChecked} className={s.custom_checkbox}
                   id={`custom-checkbox-${props.label}`} />
            <label htmlFor={`custom-checkbox-${props.label}`} className={s.checkbox__label}>
                {props.showLabel ? 'Запомнить меня' : ''}
                {props.label ? props.label : ''}
            </label>
        </div>
    );
}
