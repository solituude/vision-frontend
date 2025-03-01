import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

import Cookies from "universal-cookie";

import {AdditionalMenu} from "common/widgets/sidebar";
import {useStore} from "common/shared/tools/incrumStore/store";
import {companyStore} from "common/entities/company/model";
import {navbarDashboardItems, navbarFolderItems, navbarUserItems} from "common/widgets/sidebar/model/constants";
import {useCheckLocation} from "common/widgets/sidebar/lib/hooks";
import {Icon} from "common/shared/lib/icons/Icon";

import {childFoldersStyle} from "company/pages/companyAccountPage/lib/styleHelper";


import s from './sidebar.module.scss';

const Tooltip = ({ currItem, pageName }) => (
    <div className={currItem === pageName ? s.tooltip_hover : s.tooltip}>
        <span className={s.tooltip__label}>{pageName}</span>
    </div>
);

const Tab = ({item, handleMouseEnter, navLinkStyle, isDisabled, isHideSidebar, currItem}) => {
    return(
        <div key={`navbar-folder-item-${item.id}`} className={s.item__container}
             onMouseEnter={() => handleMouseEnter(item.pageName)}
             onMouseLeave={() => handleMouseEnter('')}>
            <NavLink to={item.link}
                     key={item.id}
                     className={navLinkStyle}
                     onClick={(e) => isDisabled && e.preventDefault()}>
                <Icon name={item.img} color={"#2C2D2E"} width={20} height={20}/>
                {!isHideSidebar && <span className={s.folder__name}>{item.pageName}</span>}
            </NavLink>

            {isHideSidebar && currItem !== '' && <Tooltip currItem={currItem} pageName={item.pageName}/>}
        </div>
    )
}

export const Sidebar = () => {
    const [store] = useStore(companyStore);
    const isDisabled = store.isFreePlanExpired && store.currPlan === 1 || (new Cookies).get('company-info')?.license === null;
    const [isHideSidebar, setIsHideSidebar] = useState(localStorage.getItem('hideSidebar') === "true");

    const [currItem, setCurrItem] = useState('');
    const [bottomItem, setBottomItem] = useState('');
    const [showHideButton, setShowHideButton] = useState(false);
    const [currLink] = useCheckLocation();

    useEffect(() => {
        if (!localStorage.getItem('hideSidebar')) {
            localStorage.setItem('hideSidebar', 'false');
        }
    }, []);

    const handleChangeVisibility = () => {
        setIsHideSidebar(!isHideSidebar);
        localStorage.setItem('hideSidebar', (!isHideSidebar).toString());
    }

    const handleMouseEnter = (newCurrItem: string) => isHideSidebar && setCurrItem(newCurrItem);

    return (
        <nav onMouseEnter={() => setShowHideButton(true)} onMouseLeave={() => setShowHideButton(false)}
             className={isHideSidebar ? s.content_hide : s.content}>
            <section className={isDisabled ? s.content__top_disabled : s.content__top}>
                <div className={s.logo__area}/>
                <div className={s.item__container}>
                    <button className={s.regular__folder}>
                        <Icon name={"search_20"} color={'--icon-primary'} width={20} height={20}/>
                        {!isHideSidebar && <span className={s.folder__name}>Поиск</span>}
                    </button>
                </div>
                <div className={s.space}/>

                <div className={s.item__container} onMouseEnter={() => handleMouseEnter("Главная")}
                     onMouseLeave={() => isHideSidebar && setCurrItem('')}>
                    <NavLink to={'/main'}
                             onClick={(e) => isDisabled && e.preventDefault()}
                             className={isDisabled ? s.regular__folder_disabled : currLink === '/main' ? s.regular__folder_active : s.regular__folder}>
                        <Icon name={"home_outline_20"} color={'--icon-primary'} width={20} height={20}/>
                        {!isHideSidebar && <span className={s.folder__name}>Главная</span>}
                    </NavLink>
                    {isHideSidebar && currItem !== '' && <Tooltip currItem={currItem} pageName="Главная"/>}
                </div>

                {
                    navbarFolderItems.map(item => (
                        <Tab key={`navbar-folder-item-${item.id}`} item={item} currItem={currItem}
                             isHideSidebar={isHideSidebar}
                             handleMouseEnter={handleMouseEnter}
                             isDisabled={isDisabled}
                             navLinkStyle={() => childFoldersStyle(item.link, isHideSidebar, isDisabled, currLink)}/>
                    ))
                }

                <div className={s.space} onMouseEnter={() => isHideSidebar && setCurrItem("space")}
                     onMouseLeave={() => isHideSidebar && setCurrItem('')}/>
                {
                    navbarDashboardItems.map(item => (
                        <Tab key={`navbar-dashboard-item-${item.id}`} item={item}
                             currItem={currItem}
                             isHideSidebar={isHideSidebar} handleMouseEnter={handleMouseEnter}
                             isDisabled={isDisabled}
                             navLinkStyle={isDisabled ? s.regular__folder_disabled : currLink === item.link ? s.regular__folder_active : s.regular__folder}/>
                    ))
                }
            </section>

            <section className={s.content__bottom}>
                {
                    navbarUserItems.map(item => (
                        <Tab key={`navbar-user-item-${item.id}`} item={item}
                             currItem={bottomItem} isHideSidebar={isHideSidebar}
                             handleMouseEnter={(newItem) => isHideSidebar && setBottomItem(newItem)}
                             navLinkStyle={isDisabled && item.id !== 9 ? s.regular__folder_disabled : currLink === item.link ? s.regular__folder_active : s.regular__folder}
                             isDisabled={isDisabled && item.id !== 9}
                        />
                    ))
                }
                <AdditionalMenu isDisabled={isDisabled} isHideSidebar={isHideSidebar} setShowHideButton={setShowHideButton}/>
            </section>
            {
                showHideButton &&
                <div className={s.hide__container}>
                    <button className={s.hide__button} onClick={handleChangeVisibility}>
                        <Icon name={isHideSidebar ? "chevron_right_2_20" : "chevron_left_2_20"}
                              color={"--icon-contrast"} width={20} height={20}/>
                    </button>
                </div>
            }
        </nav>
    )
}
