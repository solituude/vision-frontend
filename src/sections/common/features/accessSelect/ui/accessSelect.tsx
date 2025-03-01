import {FC, useState} from "react";

import {Dropdown} from "common/shared/dropdown";

import 'app/app.scss';
import s from './accessSelect.module.scss';


type PropsType = {
    setAccess: (access: string) => void;
    accessSelect: string
}
// TODO: добавить стиль на focus::active
export const AccessSelect: FC<PropsType> = ({setAccess, accessSelect}) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const handleOpenDropdown = () => {
        setShowDropdown(!showDropdown);
    }
    const handleCloseDropdown = () => {
        setShowDropdown(false);
    }

    const typeAccess = ["Все", "Общее", "Личное"];

    return(
        <div className={s.select__button}>
            <Dropdown label={`Доступ: ${accessSelect}`}
                      showDropdown={showDropdown}
                      handleCloseDropdown={handleCloseDropdown}
                      handleOpenDropdown={handleOpenDropdown}>
                <div className={s.dropdown__container}>
                    {
                        typeAccess.map(item => (
                            <div onClick={() => setAccess(item)} className={s.dropdown__item} key={`access-select-${item}`}>
                                <input type="radio" id={item} className={"custom__radio"}
                                       value={item}
                                       checked={accessSelect === item}
                                       onChange={(e) => setAccess(e.target.value)}/>
                                <label className={s.dropdown__label} htmlFor={item}>{item}</label>
                            </div>
                        ))
                    }
                </div>
            </Dropdown>
        </div>
    )
}