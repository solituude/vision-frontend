import {FC, useEffect, ReactNode} from "react";
import s from "./modal.module.scss";
import {ClickAwayListener} from "@mui/material";
import {Icon} from "common/shared/lib/icons/Icon";

type TProps = {
    headerText: string
    component: ReactNode,
    handleClose: () => void
}

export const Modal: FC<TProps> = (props) => {

    useEffect(() => {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.style.height = "100vh";
            mainElement.style.overflow = "hidden"
        }

        return (() => {
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.style.height = "100%"
                mainElement.style.overflow = "auto"
            }
        })
    }, []);

    return (
        <div className={s.container}>
            <ClickAwayListener onClickAway={props.handleClose}>
                <div className={s.card__container}>
                    <div className={s.card}>
                        <div className={s.header__container}>
                            <h3 className={s.header__text}>{props.headerText}</h3>
                        </div>
                        <div className={s.content}>
                            {props.component}
                        </div>
                    </div>
                    <button className={s.close__button} onClick={props.handleClose}>
                        <Icon name={"cancel_20"} color={"black"} width={28} height={28}/>
                    </button>
                </div>
            </ClickAwayListener>
        </div>
    )
}