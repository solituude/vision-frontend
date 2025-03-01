import {FC, useEffect, useState} from "react";
import {staffStore as store} from "common/entities/staff/model";
import {staffServices as services} from "common/entities/staff/model";
import {useStore} from "common/shared/tools/incrumStore/store";
import {Modal} from "common/shared/modal";
import {Dropdown} from "common/shared/dropdown";
import {IUser, ROLES, STATUSES} from "common/entities/staff";
import {UserInfoCard} from "common/entities/user";
import {Button} from "common/shared/button";
import {Icon} from "common/shared/lib/icons/Icon";

import s from './accessToDatasetModal.module.scss';

type PropsType = {
    close: () => void;
    datasetName: string,
}

const TEST_OWNERS: IUser[] = [
    {
        id: 7,
        firstName: "Егор",
        surName: "Егоров",
        patronymic: "Егорович",
        email: "egor@ivan.ru",
        role: ROLES.USER,
        status: STATUSES.ACTIVE,
        createdDate: "12.11.2023"
    },
    {
        id: 8,
        firstName: "Олег",
        surName: "Олегов",
        patronymic: "Олегович",
        email: "ivan@ivan.ru",
        role: ROLES.ADMIN,
        status: STATUSES.ACTIVE,
        createdDate: "02.06.2024"
    },
    {
        id: 9,
        firstName: "Владимир",
        surName: "Владимиров",
        patronymic: "Владимирович",
        email: "ivan@ivan.ru",
        role: ROLES.USER,
        status: STATUSES.BLOCKED,
        createdDate: "05.01.2023"
    },]

// TODO: добавить кнопку очищения поля
// TODO: сделать расширяемую область ввода пользователей
// TODO: добавить dropdown на выбор доступа


export const AccessToDatasetModal: FC<PropsType> = ({datasetName, close}) => {
    const [selectedUser, setSelectedUser] = useState<IUser[]>([]);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    const [staffStore, staffServices] = useStore(store, services);

    useEffect(() => {
        staffServices.searchStaff(name);
    }, [name])

    const deleteBubble = (id: number) => {
        setSelectedUser((prevState) =>
            prevState.filter(user => user.id !== id)
        );
    }

    const addBubble = (user: IUser) => {
        let isUnique = true;
        for (let i = 0; i < selectedUser.length; i++) {
            if (selectedUser[i].id === user.id) {
                isUnique = false;
                break;
            }
        }
        isUnique && setSelectedUser(prevState => [...prevState, user]);
        setName('');
    }

    const usersBubble = selectedUser.map((user) => (
        <div key={`access-to-dataset-modal-bubble-${user.id}`} className={s.bubble__container}>
            <span className={s.bubble__user}>{user.firstName} {user.surName}</span>
            <button onClick={() => deleteBubble(user.id)} className={s.delete__bubble}>
                <Icon name={"cancel_16"} color={"--icon-secondary"} height={16} width={16}/>
            </button>
        </div>
    ));

    const staffList = staffStore.currStaff.map(user => (
        <UserInfoCard key={`access-to-dataset-modal-user-info-card-${user.id}`}
                      user={user}
                      action={() => addBubble(user)}/>
    ))


    return (
        <Modal key={'access-to-dataset-model-from'}
               headerText={`Доступ к датасету "${datasetName}"`}
               component={
                   <div className={s._content}>
                       <div className={s.actions__container}>
                           <div className={s.staff__searching}>
                               <div className={s.input__container}>
                                   {usersBubble}
                                   <input
                                       placeholder={selectedUser.length === 0 ? "Пригласите сотрудников по имени или почте" : ''}
                                       value={name} onChange={(e) => setName(e.target.value)} className={s.input}/>
                               </div>
                               {name.length > 0 && staffStore.currStaff.length > 0 &&
                                   <div className={s.staff_list__container}>
                                       {staffList}
                                   </div>}
                           </div>


                           <div className={s.dropdown__button}>
                               <Dropdown label={"Редактор"}
                                         showDropdown={openDropdown}
                                         handleCloseDropdown={() => {
                                             setOpenDropdown(false)
                                         }}
                                         handleOpenDropdown={() => {
                                             setOpenDropdown(true)
                                         }}>
                                   <div className={s.dropdown__list}>
                                       {/*<div>Редактор</div>*/}
                                       {/*<div>Читатель</div>*/}
                                   </div>
                               </Dropdown>
                           </div>

                           <Button label="Добавить" className="primary" size="small" />
                       </div>

                       <div className={s.contributors__container}>
                           <div className={s.contributor__item}>
                               <UserInfoCard user={TEST_OWNERS[0]}/>
                               <span className={s.role}>Владелец</span>
                           </div>

                           <div className={s.contributor__item}>
                               <UserInfoCard user={TEST_OWNERS[1]}/>
                               <span className={s.role}>Редактор</span>
                           </div>
                           <div className={s.contributor__item}>
                               <UserInfoCard user={TEST_OWNERS[2]}/>
                               <span className={s.role}>Читатель</span>
                           </div>
                       </div>
                   </div>
               }
               handleClose={close}
        />
    )
}
