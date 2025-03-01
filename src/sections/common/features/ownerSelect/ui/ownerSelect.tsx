import {FC, useEffect, useState} from "react";

import {Dropdown} from "common/shared/dropdown";
import {IUser} from "common/entities/staff";
import {UserIcon} from "common/entities/user";
import {useStore} from "common/shared/tools/incrumStore/store";
import {staffStore} from "common/entities/staff/model";
import {Icon} from "common/shared/lib/icons/Icon";
import {useDropdown} from "common/shared/lib/hooks";

import s from './ownerSelect.module.scss'
import 'common/shared/styles/overrideBootstrap.css';

type PropsType = {
    setOwners: (owners: number[]) => void;
}

export const OwnerSelect: FC<PropsType> = ({setOwners}) => {
    const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
    const [staff] = useStore(staffStore);

    const [visibleStaff, setVisibleStaff] = useState<IUser[]>(staff.staff);
    const [inputName, setInputName] = useState<string>('');
    const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();


    useEffect(() => {
        setVisibleStaff(staff.staff.filter(user => (user.firstName.includes(inputName) || user.secondName.includes(inputName) ||
            (user.firstName + " " + user.secondName).includes(inputName) || (user.secondName + " " + user.firstName).includes(inputName))))
    }, [inputName])

    useEffect(() => setOwners(selectedStaff), [selectedStaff]);
    const handleCheckboxChange = (id: number) => {
        setSelectedStaff((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(source => source !== id);
            }
            return [...prevSelected, id];
        });
    };

    const handleDropdownToggle = (isOpen: boolean) => {
        if (!isOpen) {
            const selectedStaffNew = staff.staff.filter(user =>
                selectedStaff.includes(user.id)
            );
            const unselectedStaff = staff.staff.filter(user =>
                !selectedStaff.includes(user.id)
            );

            const filteredUnselectedStaff = unselectedStaff.filter(user =>
                (user.firstName.includes(inputName) || user.secondName.includes(inputName) ||
                    (user.firstName + " " + user.secondName).includes(inputName) ||
                    (user.secondName + " " + user.firstName).includes(inputName))
            );

            setVisibleStaff([...selectedStaffNew, ...filteredUnselectedStaff]);
        }
    };

    useEffect(() => {
        handleDropdownToggle(showDropdown);
    }, [showDropdown])

    const staffList = visibleStaff.map(user => (
        <div className={s.dropdown__item} onClick={() => handleCheckboxChange(user.id)}>
            <input className={s.custom__radio}
                   type="checkbox"
                   value={user.surName + " " + user.firstName}
                   key={`owner-select-form-check-${user.surName}-${user.firstName}-${user.id}`}
                   checked={selectedStaff.includes(user.id)}
                   onChange={() => handleCheckboxChange(user.id)}
                   id={`owner-select-form-check-${user.surName}-${user.firstName}-${user.id}`}
            />
            <label htmlFor={`owner-select-form-check-${user.surName}-${user.firstName}-${user.id}`}>
                <div className={s.item__info}>
                    <div className={s.user__icon}>
                        <UserIcon name={user.firstName} secondName={user.surName}/>
                    </div>
                    <p className={s.user_info__container}>
                        <span className={s.name__label}>{user.firstName} {user.surName}</span>
                        <span className={s.email__label}>{user.email}</span>
                    </p>
                </div>
            </label>
        </div>
    ))

    return (
        <div className={s.select__button}>
            <Dropdown label={
                <div className={s.owner_select__dropdown}>
                    Владелец: {selectedStaff.length === 0 ? "кто угодно" : "(" + (selectedStaff.length) + ")"}
                    {selectedStaff.length > 0 &&
                        <div id={'button-clear-owner-selected'}
                             className={s.cancel__button} onClick={() => {
                            setSelectedStaff([]);
                        }}><Icon name={"cancel_16"} color={"--icon-secondary"} width={16} height={16}/>
                        </div>}
                </div>
            }
                      showDropdown={showDropdown}
                      handleCloseDropdown={handleCloseDropdown}
                      handleOpenDropdown={handleOpenDropdown}>

                <div className={s.dropdown__container}>
                    <div className={s.search__container}>
                        <Icon name={"search_24"} color={"--icon-secondary"} width={24} height={24}/>
                        <input value={inputName} onChange={(e) => setInputName(e.target.value)}
                               placeholder={"Поиск людей"}
                               className={s.input__container}/>
                    </div>
                    <div className={s.menu__container}>
                        {staffList}
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}

