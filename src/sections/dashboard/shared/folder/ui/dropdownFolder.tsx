import {FC, ReactNode, useCallback, useState} from "react";

import cn from "classnames";

import {Icon} from "common/shared/lib/icons/Icon";
import {Separator} from "common/shared/separator";

import s from './folder.module.scss';

type DropdownFolderType = {
    icon: string,
    label: string,
    children?: ReactNode;
}

export const DropdownFolder: FC<DropdownFolderType> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);
    const handleHover = useCallback((state: boolean) => () => setIsHover(state), []);

    const containerClasses = cn(s.folder__container, {
        [s['folder__container--hover']]: !isOpen && isHover,
        [s['folder__container']]: isOpen
    });

    return (
        <>
            <div className={containerClasses}>
                <button className={s.folder__header}
                        onMouseEnter={handleHover(true)}
                        onMouseLeave={handleHover(false)}
                        onClick={toggleOpen}>

                    <div className={s.folder__headerContainer}>
                        <Icon name={props.icon} height={24} width={24} color={'--icon-accent'}/>
                        <span className={s.folder__label}>{props.label}</span>
                    </div>


                    <Icon name={isOpen ? 'chevron_up_20' : 'chevron_right_20'} width={20} height={20}
                          color={isHover ? "--icon-primary" : '--icon-tertiary'}/>
                </button>


                {isOpen && <div className={s.folder__content}>
                    {props.children}
                </div>}
            </div>
            <Separator/>
        </>

    )
}