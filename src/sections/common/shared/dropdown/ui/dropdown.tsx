import {FC, ReactNode} from "react";
import s from './dropdown.module.scss';
import {ClickAwayListener} from "@mui/material";
import {Icon} from "common/shared/lib/icons/Icon";

type PropsType = {
    titleAbove?: string;
    label: string | ReactNode,
    img?: string,
    showDropdown: boolean,
    handleCloseDropdown: () => void;
    handleOpenDropdown: () => void;
    children?: ReactNode,
}

export const Dropdown: FC<PropsType> = (props) => {
    return (
        <ClickAwayListener onClickAway={props.handleCloseDropdown}>
            <div className={s.container}>
                <span className={s.title__text}>{props.titleAbove}</span>
                <button onClick={props.showDropdown ? props.handleCloseDropdown : props.handleOpenDropdown} className={s.dropdown__button}>
                    <div className={s.right__side}>
                        {props.img && <Icon name={props.img} color={"--icon-accent"} width={24} height={24}/>}
                        <span className={s.dropdown__text}>
                        {props.label}
                    </span>
                    </div>
                    <Icon name={props.showDropdown ? "chevron_up_20" : "dropdown_20"} color={"--icon-secondary"} width={20} height={16}/>
                </button>
                {
                    props.showDropdown &&
                    <div className={s.dropdown__container}>
                        {props.children}
                    </div>
                }
            </div>
        </ClickAwayListener>
    )
}