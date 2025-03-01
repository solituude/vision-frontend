import {useState} from 'react';
import StepOneForm from '../stepOneForm/stepOneForm';
import StepTwoForm from '../stepTwoForm/stepTwoForm';
import StepThreeForm from '../stepThreeForm/stepThreeForm';
import s from './registrationForm.module.scss';

export const RegistrationForm = () => {
    const [step, setStep] = useState<number>(1);

    const handleNext = (): void => {
        setStep(step + 1);
    };
    const handlePrev = (): void => {
        setStep(step - 1);
    };

    return (
        <>
            {(step === 1 || step === 2) && (
                <div className={s.form}>
                    <span className={s.heading}>Регистрация</span>
                    <span className={s.subheading}>{step}/2</span>
                    {step === 1 && <StepOneForm onNext={handleNext}/>}
                    {step === 2 && <StepTwoForm onNext={handleNext} onPrev={handlePrev}/>}
                </div>
            )}
            {step === 3 && (
                <div className={s.center__stepthree}>
                    <StepThreeForm/>
                </div>
            )}
        </>
    );
};