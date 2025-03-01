import {FormEvent} from 'react';
import s from './registrationPage.module.scss';
import {RegistrationForm} from 'auth/features/registrationForm';
import {usePageTitle} from "common/shared/lib/hooks";

export const RegistrationPage = () => {
    usePageTitle("Регистрация");
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <div className={s.page__content}>
            <div className={s.content}>
                <form className={s.main_block_auth} onSubmit={handleSubmit}>
                    <RegistrationForm/>
                </form>
            </div>
            <div className={s.fullHeightWidth}>

            </div>
        </div>
    );
};
