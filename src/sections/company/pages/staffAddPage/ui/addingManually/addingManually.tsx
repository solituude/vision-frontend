import {useEffect, useState} from "react";
import {IUser, ROLES, STATUSES} from "common/entities/staff";
import s from './addingManually.module.scss';
import {UserForm} from "common/features/user";
import {staffAddAPI} from "company/pages/staffAddPage/api/api";
import {Button} from "common/shared/button";
import {Icon} from "common/shared/lib/icons/Icon";

export const AddingManually = () => {
    const [newUsers, setNewUsers] = useState<IUser[]>([{
        id: 1,
        surName: '',
        firstName: '',
        role: ROLES.USER,
        email: '',
        patronymic: ''
    } as IUser]);

    const [lastId, setLastId] = useState(1);

    const [errors, setErrors] = useState<{[key: string]: boolean | number}[]>([]);
    const [disabledButton, setDisabledButton] = useState<boolean>(false);

    const handleChange = (data: IUser, id: number) => {
        console.log(data.id, id);
        setNewUsers(prevState =>
            prevState.map(user => user.id === id ? {
                ...user,
                surName: data.surName,
                firstName: data.firstName,
                patronymic: data.patronymic,
                email: data.email,
                role: data.role
            } : user)
        );

        setErrors(prevState =>
            prevState.map(error => error.id === data.id ? {
                ...error,
                surName: false,
                firstName: false,
                email: false,
            }: error)
        );
    }

    const handleDelete = (id: number) => {
        console.log(id, newUsers);
        newUsers.length > 1 && setNewUsers([...newUsers.filter((u) => u.id !== id)]);
        errors.length > 1 && setErrors([...errors.filter((e) => e.id !== id)]);
    }

    const handleAddingForm = () => {
        setLastId(lastId + 1);
        setNewUsers([...newUsers, {
            id: lastId + 1,
            patronymic: '',
            role: ROLES.USER,
            email: '',
            firstName: '',
            surName: '',
            status: STATUSES.ACTIVE,
            createdDate: (new Date()).toString()
        }]);
        setErrors([...errors, {
            id: lastId + 1,
            firstName: false,
            surName: false,
            email: false
        }])
    }

    useEffect(() => {
        console.log(newUsers)
    }, [newUsers])

    const handleSubmit = () => {
        let isValid = true;

        const newErrors: {[key: string]: boolean | number}[] = [];
        newUsers.map((user) => {
            isValid = isValid && user.firstName !== '' && user.surName !== '' && user.email !== '';
            setDisabledButton(disabledButton || user.firstName === '' || user.surName === '' || user.email === '');
            newErrors.push({
                id: user.id,
                firstName: user.firstName === '',
                surName: user.surName === '',
                email: user.email === ''
            })
        });
        setErrors(newErrors);
        if (isValid) {
            const validStaff = newUsers.map(user => {
                return {surName: user.surName, firstName: user.firstName, patronymic: user.patronymic, email: user.email, role: user.role}
            })
            staffAddAPI.registrationNewStaff(validStaff).then(res => {
                console.log(res);
            });
        }
    }

    return (
        <div className={s.content}>
            <div className={s.forms__container}>
                {
                    newUsers.map((user, index) =>
                        <div key={`add-manually-user-form-${user.id}`}>
                            <UserForm user={user}
                                      isAdding={true}
                                      deleteUser={handleDelete}
                                      setCurrUser={handleChange}
                                      error={errors[index]}/>
                            {index !== newUsers.length - 1 && <hr className={s.separator}/>}
                        </div>
                    )
                }
                <button className={s.more__button} type="button" onClick={handleAddingForm}>
                    <Icon name={"add_20"} color={"--icon-accent"} height={24} width={24}/>
                    <span className={s.more__label}>Добавить еще</span>
                </button>
            </div>

            <div className={s.footer__container}>
                <Button key={`adding-manually-save-btn`}
                        label={"Сохранить"} onClick={handleSubmit} className={"primary"} size="small" fullWidth={true}/>
            </div>
        </div>
    )
}