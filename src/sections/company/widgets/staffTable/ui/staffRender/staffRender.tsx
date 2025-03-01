import {FC} from "react";
import {IUser, ROLES, STATUSES} from "common/entities/staff";
import {StatusCard} from "common/shared/statusCard";
import {UserIcon} from "common/entities/user";
import {staffStore} from "common/entities/staff/model";
import {useNavigate} from "react-router-dom";
import {ActionTooltip} from "common/shared/actionTooltip";
import {useStore} from "common/shared/tools/incrumStore/store";
import {getFormattedDate} from "company/widgets/staffTable/lib/helpers";
import {Icon} from "common/shared/lib/icons/Icon";

import s from './staffRender.module.scss';

type PropsType = {
    currUser: IUser | null
}

export const StaffRender: FC<PropsType> = ({currUser}) => {
    const navigate = useNavigate();
    const [staff] = useStore(staffStore);
    return (
        <tr className={s.item__row} key={currUser?.id}>
            <td className={s.td_name}>
                <div className={s.user__name}>
                    <div style={{width: 36, height: 36}}>
                        <UserIcon name={currUser? currUser.firstName : ''}
                                  secondName={currUser? currUser.surName : ''}/>
                    </div>

                    <span className={s.text}>
                        {[currUser?.surName, currUser?.firstName, currUser?.patronymic].join(' ')}
                    </span>
                </div>

            </td>
            <td className={s.td_email}><span className={s.text}>{currUser?.email}</span></td>
            <td className={s.td_role}><span className={s.text}>{currUser?.role}</span></td>
            <td className={s.td_status}>
                <div className={s.text}><StatusCard status={currUser? currUser.status : ''}/></div>
            </td>
            <td className={s.td_date}><span className={s.text}>{getFormattedDate(currUser ? currUser.createdDate : "")}</span></td>
            <td className={s.td_actions}>
                <div className={s.button__container}>
                    <ActionTooltip title="Редактировать" arrow placement="top">
                        <button className={s.button__item} onClick={() => {
                            staff.currUser = currUser;
                            navigate(`/companyaccount/staff/edit/${currUser?.id}`);
                        }}><Icon name={"pen_outline_24"} color={"--icon-accent"} height={24} width={24}/></button>
                    </ActionTooltip>

                    <ActionTooltip title={currUser?.status === STATUSES.FROZEN ? "Разморозить" : "Заморозить"} arrow placement="top">
                        <button className={s.button__item}>
                            <Icon name={"snowflake_outline_24"} color={"--icon-accent"} height={24} width={24}/>
                        </button>
                    </ActionTooltip>

                    <ActionTooltip title={currUser?.role === ROLES.CONTRACTOR ?
                        <div className={s.contractor__tooltip}>
                            <span className={s.contractor__tooltip_title}>Невозможно заблокировать единственного контрагента</span>
                            <span className={s.contractor__tooltip_subtitle}>Назначьте нового контрагента, после этого блокировка будет доступна.</span>
                        </div>
                        : currUser?.status === STATUSES.BLOCKED ? "Разблокировать" : "Заблокировать"} arrow placement="top">
                        <button disabled={currUser?.role === ROLES.CONTRACTOR} className={s.button__item}>
                            <Icon name={currUser?.status === STATUSES.BLOCKED ? "lock_open_outline_24" : "lock_outline_24"}
                                  color={"--icon-accent"}
                                  width={24} height={24}
                            />
                        </button>
                    </ActionTooltip>
                </div>
            </td>
        </tr>
    )
}
