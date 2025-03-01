import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {UserForm} from "common/entities/user";
import {Modal} from "common/shared/modal";
import {useStore} from "common/shared/tools/incrumStore/store";
import {staffStore} from "common/entities/staff/model";

import s from './staffEditPage.module.scss';
import {usePageTitle} from "common/shared/lib/hooks";

export const StaffEditPage = () => {
    const [staff] = useStore(staffStore);
    usePageTitle(`Сотрудники · Редактирование · ${staff.currUser.surName} ${staff.currUser.firstName[0]}. ${staff.currUser.patronymic[0]}.`, "Сотрудники");
    const navigate = useNavigate();
    const [error, setError] = useState<{ [key: string]: boolean }>({
        secondName: false,
        firstName: false,
        patronymic: false,
        role: false,
        email: false
    });


    return (
        <Modal key={staff.currUser?.id}
                   headerText={"Редактирование"}
                   component={
                       <>
                           <div className={s.main__content}>
                               <UserForm deleteUser={() => {
                               }} isAdding={false} setCurrUser={(user) => staff.currUser = user}
                                         user={staff.currUser} error={error}/>
                           </div>
                           <div className={s.footer__container}>
                               <button className={s.footer__button} onClick={() => {
                                   setError({
                                       secondName: staff.currUser?.secondName === '',
                                       firstName: staff.currUser?.firstName === '',
                                       patronymic: staff.currUser?.patronymic === '',
                                       role: staff.currUser?.role === '',
                                       email: staff.currUser?.email === ''
                                   })
                               }}>
                                   <span className={s.footer__text}>Сохранить</span>
                               </button>
                           </div>
                       </>
                   }
                   handleClose={() => {
                       navigate('/companyaccount/staff');
                   }}
        />
    )
}

export default StaffEditPage;