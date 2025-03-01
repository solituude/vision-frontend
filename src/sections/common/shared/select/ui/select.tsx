import s from "common/features/select/ui/select.module.scss";
import {FC} from "react";

type SelectType = {
    key: string,
    label: string,
    isChecked: boolean,
    onChange: (item: any) => void
}

export const Select: FC<SelectType> = (props) => {
    return(
        <div id={`${props.key}-select`}
             className={s.dropdown__item}>
            <input type={'radio'}
                   id={props.label}
                   value={props.label}
                   checked={props.isChecked}
                   onChange={props.onChange}
                   className={`custom__checkbox`}
            />
            <label htmlFor={props.label} className={s.dropdown__label}>{props.label}</label>
        </div>
    )
}