import {FC} from "react";
import s from './blackTooltip.module.scss';
interface Props {
    label: string,
    text: string
}

export const BlackTooltip: FC<Props> = ({label, text}) => {
    return (
        <div className={s.tooltip__container}>
            <span className={s.tooltip__label}>{label}</span>
            <span className={s.tooltip__text}>{text}</span>
        </div>
    )
}