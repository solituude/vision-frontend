import {FC, useState} from 'react';
import s from './selectForm.module.scss';
import arrowIcon from "../../lib/icons/arrow.svg";

type TOption = {
    label: string;
    value: string;
}

type TSelectFormProps = {
    options: TOption[];
    value: string;
    onChange: (value: string) => void;
    label: string;
    showError: boolean;
    errorMessage: string;
}

const SelectForm:FC<TSelectFormProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = props.options.find(option => option.value === props.value);

    const handleOptionClick = (optionValue: string) => {
        props.onChange(optionValue);
        setIsOpen(false);
    };
    return (
        <div className={s.form}>
            <label className={s.subhead}>{props.label}</label>
            <div className={s.customSelect} onClick={() => setIsOpen(!isOpen)}>
                <div className={s.selectedOption}>
                    <span className={s.text}>{selectedOption ? selectedOption.label : ''}</span>
                    <img src={arrowIcon} alt='asd'/>
                </div>
                {isOpen && (
                    <ul className={s.optionsList}>
                        {props.options.map(option => (
                            <li
                                key={option.value}
                                className={s.option}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {props.showError && <div className={s.caption_error}>{props.errorMessage}</div>}
        </div>
    );
};

export default SelectForm;
