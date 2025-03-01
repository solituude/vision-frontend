import {FC} from "react";

import {Icon} from "common/shared/lib/icons/Icon";

import s from './datasets.module.scss';

type PropsType = {
    setName: (text: string) => void;
    placeholder: string;
}

export const SearchInput: FC<PropsType> = ({setName, placeholder}) => {
    return(
        <div className={s.input__container}>
            <Icon name={"search_24"} width={24} height={24} color={"--icon-secondary"}/>
            <input onChange={e => setName(e.target.value)} placeholder={placeholder} className={s.input}/>
        </div>
    )
}