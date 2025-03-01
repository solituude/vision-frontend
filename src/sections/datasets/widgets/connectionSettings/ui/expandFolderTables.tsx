import {useState} from "react";
import s from "datasets/widgets/connectionSettings/ui/connectionSettingsView.module.scss";
import {Icon} from "common/shared/lib/icons/Icon";

export const ExpandFolderTables = () => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <div className={s.tables__container}>
            <div className={s.connections__header}>
                <button className={s.connections_expand__button} onClick={() => setShowInfo(!showInfo)}>
                    <Icon name={showInfo ? "chevron_up_20" : "dropdown_20"} width={20} height={16}
                          color={"--icon-tertiary"}/>
                    <span className={s.connections__title}>Таблицы</span>
                </button>
                <button>
                    <Icon name={"search_16"} color={"--icon-accent"} height={16} width={16}/>
                </button>
            </div>

            {showInfo && <div className={s.tables}>
                <span className={s.connections__text_unavail}>Выберите подключение</span>
            </div>}
        </div>
    )
}