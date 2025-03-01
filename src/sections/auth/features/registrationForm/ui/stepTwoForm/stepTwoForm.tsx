import {FC, useState} from 'react';
import s from './stepTwoForm.module.scss';
import {InputForm} from 'common/shared/inputForm';
import {Button} from 'common/shared/button';
import {Checkbox} from 'common/shared/checkbox';
import {generatePassword} from '../../lib/registrationFormUtils';
import {Modal} from "common/shared/modal";
import {useStore} from "common/shared/tools/incrumStore/store";
import {registrationStore, registrationServices} from "auth/features/registrationForm/model";
import {useModal} from "common/shared/lib/hooks";
import {useFormValidationStep2} from "auth/features/registrationForm/lib/hooks";
import {authAPI} from "auth/shared/tools/api";
import {registrationCompanyAPI} from "auth/features/registrationForm";

type TStepTwoFormProps = {
    onNext: () => void;
    onPrev: () => void;
}

const StepTwoForm: FC<TStepTwoFormProps> = ({onNext, onPrev}) => {
    const [regStore, services] = useStore(registrationStore, registrationServices);
    const { errors, validate } = useFormValidationStep2(regStore);
    const {isOpen, openModal, closeModal} = useModal();
    const [isAgree, setIsAgree] = useState(false);
    const handleSubmit = () => {
        authAPI.getXSRFToken();
        if (validate()) {
            registrationCompanyAPI.registerCompany({
                name: regStore.name,
                companySize: regStore.companySize,
                industry: regStore.industry,
                contractor: regStore.contractor
            }).then(res => {
                res.data ? onNext() : alert("ошибка в регистрации компании");
            });
        }
    }

    return (
        <>
            <div>
                <InputForm key={'step-two-form-input-phone'}
                           label="Телефон"
                           value={regStore.contractor.phoneNumber}
                           setValue={services.setContractorPhoneNumber}
                           showError={errors.phoneNumber}
                           errorMessage="Введите корректный номер телефона"
                           inputType="tel"
                           inputName="filedPhoneNumber"
                           placeholder="+7 (999) 000 00 00"
                />
                <InputForm key={'step-two-form-input-email'}
                           label="Почта"
                           value={regStore.contractor.email}
                           setValue={services.setContractorEmail}
                           showError={errors.email}
                           errorMessage="Введите почту"
                           inputType="email"
                           inputName="fieldEmail"
                />
                <InputForm key={'step-two-form-input-password'}
                           label="Пароль"
                           value={regStore.contractor.password}
                           setValue={services.setContractorPassword}
                           showError={errors.password}
                           errorMessage="Введите пароль"
                           inputType="password"
                           inputName="fieldPassword"
                />
            </div>

            <div className={s.button_container}>
                <Button className='secondary' size="small" type="button" label="Сгенерировать пароль" fullWidth={true}
                        onClick={() => regStore.contractor = {
                            ...regStore.contractor, password: (generatePassword(16, {
                                hasNumbers: true,
                                hasSymbols: true,
                                hasUppercase: true,
                                hasLowercase: true,
                            }))
                        }}/>
            </div>

            <div className={s.bottom_container}>
                <div className={s.user__agreement}>
                    <Checkbox checked={isAgree} onChecked={() => setIsAgree(!isAgree)} showLabel={false}/>
                    <p className={s.agreement__text}>Подтвердите, что прочитали, поняли и согласны с&nbsp;
                        <u style={{cursor: 'pointer'}} onClick={openModal}>
                            Пользовательским соглашением и Политикой конфиденциальности
                        </u>
                    </p>
                </div>
                <div className={s.buttons_container}>
                    <Button className="secondary" size="small" type="button" label="Назад" onClick={onPrev} fullWidth={true}/>
                    <Button disabled={!isAgree} className="primary" size="small" type="submit" label="Зарегистрироваться" onClick={handleSubmit} fullWidth={true}/>
                </div>
            </div>
            {
                isOpen && <div className={s.modal__container}>
                    <Modal headerText={'Пользовательское соглашение'}
                           handleClose={closeModal}
                           component={
                               <div className={s.conditions__container}>
                                   <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at porttitor eros. Vestibulum ut sem consequat, euismod tortor et, porttitor mauris. Maecenas eget iaculis justo. Phasellus posuere ex ultrices ex cursus pulvinar. Donec vel ipsum nisi. Integer tincidunt metus vel eros faucibus luctus. In hac habitasse platea dictumst. Nam in luctus dui.</span>
                                   <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at porttitor eros. Vestibulum ut sem consequat, euismod tortor et, porttitor mauris. Maecenas eget iaculis justo. Phasellus posuere ex ultrices ex cursus pulvinar. Donec vel ipsum nisi. Integer tincidunt metus vel eros faucibus luctus. In hac habitasse platea dictumst. Nam in luctus dui.</span>
                                   <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at porttitor eros. Vestibulum ut sem consequat, euismod tortor et, porttitor mauris. Maecenas eget iaculis justo. Phasellus posuere ex ultrices ex cursus pulvinar. Donec vel ipsum nisi. Integer tincidunt metus vel eros faucibus luctus. In hac habitasse platea dictumst. Nam in luctus dui.</span>
                                   <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at porttitor eros. Vestibulum ut sem consequat, euismod tortor et, porttitor mauris. Maecenas eget iaculis justo. Phasellus posuere ex ultrices ex cursus pulvinar. Donec vel ipsum nisi. Integer tincidunt metus vel eros faucibus luctus. In hac habitasse platea dictumst. Nam in luctus dui.</span>
                               </div>
                           }/></div>
            }
        </>
    );
};

export default StepTwoForm;