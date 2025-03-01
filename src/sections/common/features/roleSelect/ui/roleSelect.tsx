import {FC} from "react";

import {Dropdown} from "common/shared/dropdown";
import {useDropdown} from "common/shared/lib/hooks";

import s from './roleSelect.module.scss';

type RoleType = {
    user: boolean,
    admin: boolean,
    contractor: boolean
}

type PropsType = {
    role: RoleType,
    setRole: (role: RoleType) => void,
}


export const RoleSelect: FC<PropsType> = ({role, setRole}) => {
    const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();
    return (
        <div className={s.select__button}>
            <Dropdown label={"Роль"}
                      showDropdown={showDropdown}
                      handleOpenDropdown={handleOpenDropdown}
                      handleCloseDropdown={handleCloseDropdown}>
                <div className={s.dropdown__container}>
                    <div className={s.dropdown__item}>
                        <input className={s.custom__radio}
                               type="checkbox"
                               key={`role-select-form-check-user`}
                               checked={role.user}
                               onChange={() => setRole({...role, user: !role.user})}
                               id={`role-select-form-check-user`}/>
                        <label htmlFor={`role-select-form-check-user`}>
                            <div className={s.item__info}>
                                <span className={s.role__label}>Пользователь</span>
                            </div>
                        </label>
                    </div>

                    <div className={s.dropdown__item}>
                        <input className={s.custom__radio}
                               type="checkbox"
                               key={`role-select-form-check-admin`}
                               checked={role.admin}
                               onChange={() => setRole({...role, admin: !role.admin})}
                               id={`role-select-form-check-admin`}/>
                        <label htmlFor={`role-select-form-check-admin`}>
                            <div className={s.item__info}>
                                <span className={s.role__label}>Администратор</span>
                            </div>
                        </label>
                    </div>

                    <div className={s.dropdown__item}>
                        <input className={s.custom__radio}
                               type="checkbox"
                               key={`role-select-form-check-contractor`}
                               checked={role.contractor}
                               onChange={() => setRole({...role, contractor: !role.contractor})}
                               id={`role-select-form-check-contractor`}/>
                        <label htmlFor={`role-select-form-check-contractor`}>
                            <div className={s.item__info}>
                                <span className={s.role__label}>Контрагент</span>
                            </div>
                        </label>
                    </div>
                </div>
            </Dropdown>


        </div>
    )
}