import {useState} from "react";

import {Icon} from "common/shared/lib/icons/Icon";

import s from "./connectionSettingsView.module.scss";

export const ExpandFolderConnection = () => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <div className={s.folder__container}>
            <div className={s.connections__header}>
                <button className={s.connections_expand__button} onClick={() => setShowInfo(!showInfo)}>
                    <Icon name={showInfo ? "chevron_up_20" : "dropdown_20"} width={20} height={16}
                          color={"--icon-tertiary"}/>
                    <span className={s.connections__title}>Подключения</span>
                </button>
                <button>
                    <Icon name={"add_16"} color={"--icon-accent"} height={16} width={16}/>
                </button>
            </div>
            {showInfo &&
                <div className={s.connections__body}>
                    <span className={s.connections__text_unavail}>Не выбрано</span>
                </div>
            }
        </div>
    )
}