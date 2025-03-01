import React, {useId} from "react";
import s from './addingCSV.module.scss';
import {Button} from "common/shared/button";
import {Icon} from "common/shared/lib/icons/Icon";

export const AddingCSV: React.FC = () => {
    const id = useId();

    return(
        <div className={s.csv__content}>
            <label className={s.put__container} htmlFor={id}>
                <Icon name={"cloud_arrow_up_outline_48"} color={''} height={44} width={44}/>
                <div className={s.info__container}>
                    <span className={s.info__header}>Перетащите файл сюда или выберите</span>
                    <span className={s.info__regular}>Файл должен содержать 5 столбцов: Фамилия, Имя, Отчество, Почта, Роль</span>
                </div>
                <input id={id} type="file" className={s.input_hidden}/>
            </label>

            <Button label={"Скачать шаблон CSV файла загрузки"} className="secondary"
                    img={"download_outline_24"} imgColor={"--icon-accent"} size="big" fullWidth={true}/>
        </div>
    )
}