import {FC} from "react";
import s from './statusCard.module.scss';

type PropsType = {
    status: string
}

export const StatusCard:FC<PropsType> = ({status}) => {
    return(
        <>
            {status === "Активный" && <div className={s.card__container_active}><span className={s.card__text}>{status}</span></div> }
            {status === "В отпуске" && <div className={s.card__container_frozen}><span className={s.card__text}>{status}</span></div> }
            {status === "Заблокирован" && <div className={s.card__container_blocked}><span className={s.card__text}>{status}</span></div> }
        </>

    )
}