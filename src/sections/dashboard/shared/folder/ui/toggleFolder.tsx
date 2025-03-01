import {FC, ReactNode, useCallback, useState} from "react";

import cn from "classnames";
import {Switch} from "@mui/material";

import {Icon} from "common/shared/lib/icons/Icon";
import {Separator} from "common/shared/separator";

import s from './folder.module.scss';

type ToggleFolderType = {
    icon: string,
    label: string,
    children?: ReactNode;
    isChecked: boolean;
    onChange: (updChecked: boolean) => void;
}
export const ToggleFolder: FC<ToggleFolderType> = (props) => {
    // const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();
    const [isHover, setIsHover] = useState(false);

    const toggleOpen = useCallback(() => props.onChange(!props.isChecked), []);
    const handleHover = useCallback((state: boolean) => () => setIsHover(state), []);

    const containerClasses = cn(s.folder__container, {
        [s['folder__container--hover']]: !props.isChecked && isHover,
        [s['folder__container']]: props.isChecked
    });
    return(
        <>
            <div className={containerClasses}>
                <div className={s.folder__header}
                     onMouseEnter={handleHover(true)}
                     onMouseLeave={handleHover(false)}
                     onClick={toggleOpen}>

                    <div className={s.folder__headerContainer}>
                        <Icon name={props.icon} height={24} width={24} color={'--icon-accent'}/>
                        <span className={s.folder__label}>{props.label}</span>
                    </div>


                    <Switch checked={props.isChecked} onChange={() => props.onChange(!props.isChecked)}/>
                </div>

                {props.isChecked && props.children}
            </div>
            <Separator/>
        </>
    )
}