import {createPortal} from "react-dom";

import {notificationStore, useTimerErrorPopup} from "common/widgets/notificationPopup";
import {Icon} from "common/shared/lib/icons/Icon";
import {ErrorStoreType} from "common/widgets/notificationPopup/model/notificationStore";
import {useStore} from "common/shared/tools/incrumStore/store";

import s from './notificationPopup.module.scss';

export const NotificationPopup = () => {
    const [store]: ErrorStoreType[] = useStore(notificationStore);
    const {isOpen, closeStyle} = useTimerErrorPopup();

    return isOpen && createPortal(
        <div className={closeStyle ? s.main__container_close : s.main__container}>
            <div className={s.info__container}>
                <Icon name={"error_circle_outline_20"} color={"--icon-negative"} width={28} height={28}/>

                <span className={s.error__text}>
                    {store.text}
                </span>
            </div>

            <button>
                <Icon name={"cancel_24"} color={"--icon-primary"} width={24} height={24}/>
            </button>
        </div>, document.body);
}
