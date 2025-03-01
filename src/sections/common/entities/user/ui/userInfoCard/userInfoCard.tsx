import {UserIcon} from "common/entities/user";
import {IUser} from "common/entities/staff";
import {FC} from "react";
import s from './userInfoCard.module.scss';


type PropsType = {
    action?: () => void;
    user: IUser;
}

export const UserInfoCard: FC<PropsType> = (props) => {
    return(
        <div onClick={props.action} className={s.user__container}>
            <div className={s.icon__user}>
                <UserIcon name={props.user.firstName} secondName={props.user.surName}/>
            </div>

            <p className={s.user__info}>
                <span className={s.user__name}>{props.user.surName} {props.user.firstName}</span>
                <span className={s.user__email}>{props.user.email}</span>
            </p>
        </div>
    )
}