import {FC} from 'react';
import s from './authForm.module.scss';
import { InputForm } from 'common/shared/inputForm';

type FormPasswordPropsType = {
    valuePassword: string;
    setPassword: (password: string) => void;
    showError: boolean;
    errorMessage: string
}

export const FormPassword: FC<FormPasswordPropsType> = ({ valuePassword, setPassword, showError, errorMessage }) => {
    return (
        <div className={s.form}>
            <InputForm
                label="Пароль"
                value={valuePassword}
                setValue={setPassword}
                showError={showError}
                errorMessage={errorMessage}
                inputType="password"
                inputName="fieldPassword"/>
        </div>
    );
};
