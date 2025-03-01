import {useState, FC, createRef} from "react";
import s from "common/widgets/sidebar/ui/sidebar.module.scss";
import {NavLink} from "react-router-dom";

import {SidebarItemType} from "common/widgets/sidebar/model/types";
import {UserIcon} from "common/entities/user";
import Cookies from "universal-cookie";
import {requestLogout} from "common/shared/lib/middleware";
import {ClickAwayListener} from "@mui/material";
import {Icon} from "common/shared/lib/icons/Icon";

const cookie = new Cookies();

const ROLE: string = 'ADMIN';


const additionalManuItems: SidebarItemType[] = [
    {id: 11, pageName: "Профиль компании", link: '/companyaccount', img: "user_circle_outline_20"},
    {id: 12, pageName: "Тарифный план", link: '/companyaccount/plans', img: "money_circle_outline_20"},
    {id: 13, pageName: "Сотрудники", link: '/companyaccount/staff', img: "users_3_outline_20"}
]

type PropsType = {
    isDisabled: boolean,
    isHideSidebar: boolean,
    setShowHideButton: (isShow: boolean) => void;
}

export const AdditionalMenu: FC<PropsType> = ({isDisabled, isHideSidebar, setShowHideButton}) => {
    const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);
    const ref = createRef<HTMLButtonElement>();
    const [isHover, setIsHover] = useState(false);
    const userInfo = cookie.get('user-info');

    return (
        <>
            <div className={s.item__container}
                 onMouseEnter={() => isHideSidebar && setIsHover(true)}
                 onMouseLeave={() => isHideSidebar && setIsHover(false)}>
                <button ref={ref}
                        className={s.regular__folder}
                        onClick={() => setIsOpenOverlay(!isOpenOverlay)}>
                    <div className={isHideSidebar ? s.user__icon_hide : s.user__icon}>
                        <UserIcon name={userInfo?.firstName} fontSize={10}/>
                    </div>

                    {!isHideSidebar &&
                        <span
                            className={isDisabled ? s.folder__name_disabled : s.folder__name}>{userInfo?.firstName}</span>}
                </button>
                {(isHideSidebar && isHover) &&
                    <div className={isHover ? s.tooltip_hover : s.tooltip}>
                                    <span className={s.tooltip__label}>
                                        Личный кабинет
                                    </span>
                    </div>}
            </div>

            {
                isOpenOverlay &&
                <ClickAwayListener onClickAway={() => setIsOpenOverlay(false)}>
                    <div className={s.overlay__container}>

                        <div className={s.overlay__top}>
                            <div className={s.overlay__header}>
                                <div style={{width: 56, height: 56}}>
                                    <UserIcon name={userInfo?.firstName} secondName={userInfo?.surName} fontSize={20}/>
                                </div>

                                <p className={s.overlay__user}>
                                    <span className={s.company__label}>{cookie.get('company-info').name}</span>
                                    <span className={s.user_info__text}>{userInfo?.firstName} {userInfo?.surName}</span>
                                    <span className={s.user_info__text}>{userInfo?.email}</span>
                                </p>
                            </div>

                            {
                                ROLE === "ADMIN" && additionalManuItems.map(item => (
                                    <NavLink key={item.id} to={item.link} onClick={() => {
                                        setIsOpenOverlay(false);
                                        setShowHideButton(false);
                                    }}
                                             className={item.id === 11 ? s.regular__folder_add : s.main__folder_add}>
                                        <Icon name={item.img} color={"#2C2D2E"} height={20} width={20}/>
                                        <span className={s.folder__name_add}>{item.pageName}</span>
                                    </NavLink>
                                ))
                            }
                        </div>

                        <button className={s.exit__button} onClick={requestLogout}>
                            <Icon name={"door_arrow_right_outline_20"} color={"--icon-primary"} height={20} width={20}/>
                            <span className={s.folder__name_add}>
                                Выйти
                            </span>
                        </button>
                    </div>
                </ClickAwayListener>
            }
        </>
    )
}