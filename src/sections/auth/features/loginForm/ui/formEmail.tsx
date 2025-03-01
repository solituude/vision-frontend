import {FC} from 'react';
import s from './authForm.module.scss';
import { InputForm } from 'common/shared/inputForm';

type FormEmailPropsType = {
    valueEmail: string;
    setEmail: (email: string) => void;
    showError: boolean;
    errorMessage: string;
}

export const FormEmail: FC<FormEmailPropsType> = ({ valueEmail, setEmail, showError, errorMessage }) => {
    return (
        <div className={s.form}>
            <InputForm
                label="Почта"
                value={valueEmail}
                setValue={setEmail}
                showError={showError}
                errorMessage={errorMessage}
                inputType="email"
                inputName="fieldEmail"
            />
        </div>
    );
};
