import {FC} from 'react';
import {InputForm} from 'common/shared/inputForm';
import {Button} from 'common/shared/button';
import s from './stepOneForm.module.scss'
import SelectForm from '../selectForm/selectForm';
import {OPTIONS_COMPANY_ACTIVITY, OPTIONS_COMPANY_SIZE} from "../../lib/constants";
import {useStore} from "common/shared/tools/incrumStore/store";
import {registrationServices, registrationStore} from "auth/features/registrationForm/model";
import {useFormValidationStep1} from "auth/features/registrationForm/lib/hooks";

const StepOneForm: FC<{ onNext: () => void }> = ({onNext}) => {
    const [regStore, regServices] = useStore(registrationStore, registrationServices);
    const {errors, validate} = useFormValidationStep1(regStore);
    const handleSubmit = () => {
        if (validate()) {
            onNext();
        }
    }
    return (
        <div className={s.container}>
            <div>
                <InputForm
                    label="Название компании"
                    key='reg-step-one-input-company-name'
                    value={regStore.name}
                    setValue={regServices.setCompanyName}
                    showError={errors.name}
                    errorMessage="Введите название"
                    inputType="text"
                    inputName="filedCompanyName"
                />
                <SelectForm options={OPTIONS_COMPANY_ACTIVITY}
                            key={'reg-step-one-select-form-industry'}
                            value={regStore.industry}
                            onChange={regServices.setIndustry}
                            label='Сфера деятельности'
                            showError={errors.industry}
                            errorMessage="Выберите сферу деятельности"/>
                <SelectForm options={OPTIONS_COMPANY_SIZE}
                            value={regStore.companySize}
                            key={'reg-step-one-select-form-companySize'}
                            onChange={regServices.setCompanySize}
                            label='Размер компании'
                            showError={errors.companySize}
                            errorMessage="Выберите размер компании"/>
                <InputForm
                    label="Ваша должность"
                    value={regStore.contractor.position}
                    key='reg-step-one-input-position'
                    setValue={regServices.setContractorPosition}
                    showError={errors.position}
                    errorMessage="Введите должность"
                    inputType="text"
                    inputName="fieldPeoplePosition"
                />
                <div style={{marginBottom: '30px'}}/>
                <InputForm
                    label="Фамилия"
                    key='reg-step-one-input-contractor-surname'
                    value={regStore.contractor.surName}
                    setValue={regServices.setContractorSurName}
                    showError={errors.surName}
                    errorMessage="Введите фамилию"
                    inputType="surname"
                    inputName="fieldPeopleSurname"
                />
                <InputForm
                    label="Имя"
                    value={regStore.contractor.firstName}
                    key='reg-step-one-input-contractor-firstname'
                    setValue={regServices.setContractorFirstName}
                    showError={errors.firstName}
                    errorMessage="Введите имя"
                    inputType="text"
                    inputName="fieldPeopleName"
                />
                <InputForm
                    label="Отчество (при наличии)"
                    key='reg-step-one-input-contractor-patronymic'
                    value={regStore.contractor.patronymic}
                    setValue={regServices.setContractorPatronymic}
                    showError={false}
                    errorMessage=""
                    inputType="text"
                    inputName="fieldPeoplePatronymic"
                />
            </div>

            <div className={s.bottom_container}>
                <Button type="submit" label="Далее" onClick={handleSubmit} fullWidth={true} size="small" className="primary"/>
            </div>
        </div>
    );
};

export default StepOneForm;
