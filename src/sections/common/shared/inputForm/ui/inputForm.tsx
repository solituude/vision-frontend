import {FC, useState} from 'react';
import s from './inputForm.module.scss';
import styles from "common/shared/inputForm/ui/input.module.css";
import hidePasswordIcon from "common/shared/lib/icons/hidePassword.svg";

type TFormInputProps = {
    label: string;
    value: string;
    setValue: (value: string) => void;
    showError?: boolean;
    errorMessage?: string;
    inputType?: string;
    inputName?: string;
    placeholder?: string;
}

export const InputForm: FC<TFormInputProps> = ({
    label,
    value="",
    setValue,
    showError,
    errorMessage,
    inputType = 'text',
    inputName = '',
    placeholder = ''
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return (
        <div className={s.form}>
            <label htmlFor={`input-form-${label}`} className={s.subhead}>{label}</label>
            <div className={s.input_container}>
                <input autoComplete={inputType}
                       id={`input-form-${label}`}
                       type={showPassword && inputType === 'password' ? 'text' : inputType}
                       className={styles.textarea}
                       name={inputName}
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                       placeholder={placeholder}
                />
                {inputType === 'password' && (
                    <img src={hidePasswordIcon}
                         alt="show/hide password"
                         className={styles.show_password}
                         onClick={toggleShowPassword}
                    />
                )}
            </div>
            {showError && <div className={s.caption_error}>{errorMessage}</div>}
        </div>
    );
};
