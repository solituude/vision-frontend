import {Icon} from "common/shared/lib/icons/Icon";

import s from "./connectionSettingsView.module.scss";

export const UsedTables = () => {
    return (
        <div className={s.used_tables__container}>
            <div className={s.used_tables}>
                <span className={s.used_tables__header}>Используемые</span>

                <div className={s.used_tables__content}>
                    <Icon name={"add_circle_outline_20"} height={20} width={20} color={"--icon-secondary"}/>
                    <span className={s.connections__text_unavail}>
                        Перетащите нужные таблицы для формирования связей
                    </span>
                </div>
            </div>
        </div>
    )
}