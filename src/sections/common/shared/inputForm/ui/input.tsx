import { useState, FC } from 'react';
import styles from './input.module.css';
import hidePasswordIcon from '../../lib/icons/hidePassword.svg';

type TInputProps = {
    value: string;
    setValue: (value: string) => void;
    inputType?: string;
    inputName?: string;
    placeholder?: string;
}

export const Input: FC<TInputProps> = ({
    value,
    setValue,
    inputType = 'text',
    inputName = '',
    placeholder = '',
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <>
            <input
                autoComplete={inputType}
                type={showPassword && inputType === 'password' ? 'text' : inputType}
                className={styles.textarea}
                name={inputName}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
            />
            {inputType === 'password' && (
                <img
                    src={hidePasswordIcon}
                    alt="show/hide password"
                    className={styles.show_password}
                    onClick={toggleShowPassword}
                />
            )}
        </>
    );
};
