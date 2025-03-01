import React, {useEffect} from "react";
import {IUser, ROLES} from "common/entities/staff";
import s from './userForm.module.scss';
import {Dropdown} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Icon} from "common/shared/lib/icons/Icon";

type Props = {
    user: IUser | null
    setCurrUser: ((data: IUser, id: number) => void);
    error: { [key: string]: boolean | number }
    isAdding: boolean,
    deleteUser: (id: number) => void,
}

export const UserForm: React.FC<Props> = ({user, setCurrUser, error, deleteUser, isAdding}) => {
    useEffect(() => {
        console.log(user);
    }, [user])
    return (
        <form id={`user-form-${user?.id}`} className={s.form__container}>
            <div className={s.row__container}>
                <div className={s.row__item}>
                    <label className={s.label__text}>Фамилия</label>
                    <input value={user?.surName}
                           onChange={(e) => setCurrUser({...user, surName: e.target.value} as IUser, user?.id || 1)}
                           className={s.input__container}/>
                    {error?.surName && <span className={s.error_text}>Заполните поле</span>}
                </div>
                <div className={s.row__item}>
                    <label className={s.label__text}>Имя</label>
                    <input value={user?.firstName}
                           onChange={(e) => setCurrUser({...user, firstName: e.target.value} as IUser, user?.id || 1)}
                           className={s.input__container}/>
                    {error?.firstName && <span className={s.error_text}>Заполните поле</span>}
                </div>
            </div>

            <div className={s.row__container}>
                <div className={s.row__item}>
                    <label className={s.label__text}>Отчество (необязательно)</label>
                    <input value={user?.patronymic}
                           onChange={(e) => setCurrUser({...user, patronymic: e.target.value} as IUser, user?.id || 1)}
                           className={s.input__container}/>
                </div>
                <div className={s.row__item}>
                    <label className={s.label__text} htmlFor={`dropdown-user-from-${user?.id}`}>Роль</label>
                    <Dropdown id={`dropdown-user-from-${user?.id}`} autoClose="outside">
                        <Dropdown.Toggle id={`dropdown-toggle-${user?.id}`} className={s.role__dropdown}>
                            {user ? user.role : "Выберите роль"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Form.Check type="radio"
                                        key={`form-check-${user?.id}-user`}
                                        checked={ROLES.USER === user?.role}
                                        value={ROLES.USER}
                                        onChange={() => {
                                            setCurrUser({...user, role: ROLES.USER} as IUser, user?.id || 0);
                                        }}
                                        id={`${ROLES.USER}-${user?.id}`}
                                        label={ROLES.USER}></Form.Check>
                            <Form.Check checked={ROLES.ADMIN === user?.role}
                                        key={`form-check-${user?.id}-admin`}
                                        value={ROLES.ADMIN}
                                        onChange={() => setCurrUser({...user, role: ROLES.ADMIN} as IUser, user?.id || 0)}
                                        type="radio"
                                        id={`${ROLES.ADMIN}-${user?.id}`}
                                        label={ROLES.ADMIN}></Form.Check>
                            <Form.Check checked={ROLES.CONTRACTOR === user?.role}
                                        key={`form-check-${user?.id}-contractor`}
                                        value={ROLES.CONTRACTOR}
                                        onChange={() => setCurrUser({...user, role: ROLES.CONTRACTOR} as IUser, user?.id || 0)}
                                        type="radio"
                                        id={`${ROLES.CONTRACTOR}-${user?.id}`}
                                        label={ROLES.CONTRACTOR}></Form.Check>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <div className={s.row__container}>
                <div className={s.row__item}>
                    <label className={s.label__text}>Почта</label>
                    <input value={user?.email}
                           onChange={(e) => setCurrUser({...user, email: e.target.value} as IUser, user?.id || 1)}
                           inputMode="email"
                           className={s.input__container}/>
                    {error?.email && <span className={s.error_text}>Заполните поле</span>}
                </div>
                {isAdding && <div id={"deleteUser"} className={s.delete__container}>
                    <button type="button" onClick={() => deleteUser(user ? user?.id : -1)} className={s.delete__button}>
                        <Icon name={"delete_outline_24"} height={24} width={24} color={"--icon-accent"}/>
                    </button>
                </div>
                }
            </div>
        </form>
    )
}
