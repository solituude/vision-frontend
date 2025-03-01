import { useState} from 'react';
import {NavLink} from 'react-router-dom';
import {FormEmail, FormPassword} from 'auth/features/loginForm';
import {Button} from 'common/shared/button';
import {Checkbox} from 'common/shared/checkbox';
import s from './loginPage.module.css';
import {userAPI} from "common/entities/user/api";
import {usePageTitle} from "common/shared/lib/hooks";
import {loginAPI} from "auth/pages/loginPage/api/api";


export const LoginPage = () => {
    usePageTitle("Вход");
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });

    const handleInputChange = (field: 'email' | 'password', value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setFormErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = async () => {
        const res = await loginAPI.requestLogin(formData);
        if (!res.data) {
            setFormErrors({
                email: 'Такой почты не существует',
                password: 'Неверный пароль',
            });
        } else {
            await userAPI.getCompanyInfo();
            window.location.href = '/';
        }
    };

    return (
        <div className={s.content}>
            <form className={s.main_block_auth} onSubmit={handleSubmit}>
                <span className={s.heading}>Вход</span>
                <FormEmail setEmail={(value) => handleInputChange('email', value)}
                           showError={!!formErrors.email} errorMessage={formErrors.email} valueEmail={formData.email}/>
                <FormPassword setPassword={(value) => handleInputChange('password', value)}
                              showError={!!formErrors.password}
                              errorMessage={formErrors.password} valuePassword={formData.password}/>
                <div className={s.password_recovery_link}>
                    <NavLink to='/passwordrecovery' className={s.link__decoration_none}>
                        Не помню пароль
                    </NavLink>
                </div>

                <div className={s.container_checkbox}>
                    <Checkbox showLabel={true}/>
                </div>

                <div className={s.buttons_container}>
                    <Button type="button" label="Войти" onClick={handleSubmit} size={"small"} fullWidth={true} className='primary'/>
                </div>
            </form>
        </div>
    );
};
