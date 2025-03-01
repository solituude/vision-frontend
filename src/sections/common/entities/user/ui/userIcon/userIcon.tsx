import {FC} from "react";
import s from './userIcon.module.scss'
type PropsType = {
    secondName?: string
    name: string,
    fontSize?: number
}
export const UserIcon: FC<PropsType> = ({name, secondName= "", fontSize=13}) => {
    return(
        <div className={s[`icon__container_${name?.length % 8}`]}>
            <span style={{fontSize}} className={s.letter}>{secondName ? secondName[0] : ''}{name ? name[0] : ''}</span>
        </div>
    )
}