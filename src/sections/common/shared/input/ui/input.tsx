import {FC} from "react";
import s from "./input.module.scss";

type InputPropsType = {
    value: string | number;
    onChange: (value: any) => void;
    type: "text" | "password";
    size: "small" | "regular";
    error?: boolean;
    textError?: string;
    placeholder?: string;
}

export const Input: FC<InputPropsType> = (props) => {
    return(
        <input type={props.type}
               value={props.value}
               onChange={(e) => props.onChange(e.target.value)}
               placeholder={props.placeholder}
               className={`${s[`input__container_${props.size}`]}`}/>
    )
}