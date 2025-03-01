import {FC, useEffect, useState} from 'react';

import {Button} from 'common/shared/button';
import {CustomTimer} from 'auth/shared/customTimer';
import {InputForm} from 'common/shared/inputForm';
import {Modal} from 'common/shared/modal';

import s from './stepThreeForm.module.scss';
import modalS from '../stepTwoForm/stepTwoForm.module.scss';
import {useStore} from "common/shared/tools/incrumStore/store";
import {registrationStore} from "auth/features/registrationForm/model";
import {CompanyInfoType} from "company/shared/types";

const StepThreeForm: FC = () => {
    const [regStore]: CompanyInfoType[] = useStore(registrationStore);
    const [email, setEmail] = useState<string>('example@mail.ru');
    const [emailError, setEmailError] = useState<boolean>(false);

    const [timer, setTimer] = useState<number>(30);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tempEmail, setTempEmail] = useState<string>('');

    const resetTimer = (): void => {
        setTimer(30);
        setIsTimerActive(true);
    };

    useEffect(() => {
        setEmailError(false);
    }, []);

    const openModal = () => {
        setTempEmail(email);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const saveEmail = () => {
        if (tempEmail.trim() === '') {
            setEmailError(true);
        } else {
            resetTimer()
            setEmail(tempEmail);
            closeModal();
        }
    };

    return (
        <div className={s.content}>
            <span className={s.heading}>Проверьте почту</span>
            <p className={s.subhead}>
                Для завершения процесса регистрации, пожалуйста, подтвердите ваш адрес электронной почты.
                <br/>
                Мы отправили ссылку для подтверждения на почту: <b>{regStore.contractor.email}</b>
            </p>
            {isTimerActive ? (
                <p className={s.subhead}>
                    Если вы не получили письмо, нажмите «Отправить повторно» через <b>00:</b>
                    <b><CustomTimer initialSeconds={timer} setIsTimerActive={setIsTimerActive}/></b> или напишите на
                    support@vision.com
                </p>
            ) : (
                <div className={s.buttons_container}>
                    <Button size="small" className="primary" type="submit" label="Отправить повторно" fullWidth={true} onClick={resetTimer}/>
                </div>
            )}
            <div className={s.buttons_container}>
                <Button className="secondary" size="small" type="submit" fullWidth={true} label="Изменить адрес электронной почты"
                        onClick={openModal}/>
            </div>

            {modalIsOpen &&
                <div className={modalS.modal__container}>
                    <Modal headerText={"Изменение адреса электронной почты"}
                           handleClose={closeModal}
                           component={
                               <div className={s.modal__content}>
                                   <InputForm
                                       label="Почта"
                                       value={tempEmail}
                                       setValue={setTempEmail}
                                       showError={emailError}
                                       errorMessage="Введите адрес электронной почты"
                                       inputType="email"
                                       inputName="filedEmail"
                                       placeholder="example@mail.ru"
                                   />
                                   <hr/>
                                   <div className={s.buttons_container}>
                                       <Button className="primary" size="small" type="submit" label="Сохранить"
                                               onClick={saveEmail} fullWidth={true}/>
                                   </div>
                               </div>}
                    />
                </div>
            }

        </div>
    );
};

export default StepThreeForm;
