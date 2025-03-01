import {FC} from 'react';

import {Icon} from "common/shared/lib/icons/Icon";

import s from './button.module.scss';

// todo: заменить размер на конкретные типы
// todo: заменить стили


type ButtonPropsType = {
    label: string;
    onClick?: (arg: any) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className: 'primary' | 'secondary' | "negative" | "neutral" | "negative_secondary";
    img?: string;
    imgColor?: string;
    size?: string;
    fullWidth?: boolean;
}

export const Button: FC<ButtonPropsType> = (props) => {
    return (
        <button
            style={{width: props.fullWidth ? "100%" : undefined}}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
            className={`${s[`btn__${props.className}`]} ${s[`btn__${props.size}`]}`}>

            {props.img &&
                <Icon name={props.img} color={props.imgColor} width={24} height={24}/>
            }

            <span className={s[`label__${props.className}`]}>
                {props.label}
            </span>
        </button>
    );
};
