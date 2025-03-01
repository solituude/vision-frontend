import {useEffect, useState} from "react";
import {useStore} from "common/shared/tools/incrumStore/store";
import {notificationStore} from "common/widgets/notificationPopup";

export const useTimerErrorPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [closeStyle, setCloseStyle] = useState(false);
    const [store] = useStore(notificationStore);

    useEffect(() => {
        setTimeout(() => {
            setCloseStyle(true);
        }, 4800)
    }, [store.text]);

    useEffect(() => {
        store.text && setIsOpen(true);
        setTimeout(() => {
            setIsOpen(false)
            store.text = undefined;
            setCloseStyle(false);
        }, 5000)
    }, [store.text]);

    return {isOpen, closeStyle};
}