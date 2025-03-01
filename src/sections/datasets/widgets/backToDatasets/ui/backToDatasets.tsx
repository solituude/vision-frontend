import {useNavigate} from "react-router-dom";

import {Icon} from "common/shared/lib/icons/Icon";

import s from './backToDatasets.module.scss';

export const BackToDatasets = () => {
    const navigate = useNavigate();
    return (
        <div className={s.container}>
            <button onClick={() => navigate('/datasets')} className={s.button__container}>
                <Icon name={"arrow_left_outline_24"} color={"--icon-accent"} height={24} width={24}/>
            </button>

            <label className={s.label__text}> Новый датасет </label>
        </div>
    )
}