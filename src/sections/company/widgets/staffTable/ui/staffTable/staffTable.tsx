import {Table} from "react-bootstrap";
import {StaffRender} from "../staffRender/staffRender";
import s from './staffTable.module.scss';
import {useStore} from "common/shared/tools/incrumStore/store";
import {staffStore} from "common/entities/staff/model";


export const StaffTable = () => {
    const [staff] = useStore(staffStore);

    return (
        <Table className={s.staff__table}>
            <thead>
            <tr className={s.staff__thead}>
                <td className={s.header__item_name}><span className={s.header__text}>ФИО</span></td>
                <td className={s.header__item_email}><span className={s.header__text}>Почта</span></td>
                <td className={s.header__item_role}><span className={s.header__text}>Роль</span></td>
                <td className={s.header__item_status}><span className={s.header__text}>Статус</span></td>
                <td className={s.header__item_date}><span className={s.header__text}>Дата добавления</span></td>
                <td className={s.header__item_actions} colSpan={3}/>
            </tr>
            </thead>

            <tbody className={s.body__table}>
            {
                staff.currStaff?.length > 0 ? staff.currStaff.map(user => <StaffRender key={user.id} currUser={user}/>) :
                    <tr className={s.item__row}>
                        <td colSpan={6} style={{textAlign: "center"}}>
                            <span className={s.text}>Данных нет</span>
                        </td>
                    </tr>
            }
            </tbody>
        </Table>
    )
}

