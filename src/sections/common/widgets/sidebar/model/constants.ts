import Cookies from "universal-cookie";

import {SidebarItemType} from "common/widgets/sidebar/model/types";

const cookie = new Cookies();
const companyInfo = cookie.get('company-info');

export const navbarFolderItems: SidebarItemType[] = [
    {id: 2, pageName: companyInfo ? companyInfo.name : '' , link: '/company', img: "work_outline_20"},
    {id: 4, pageName: "Избранное", link: '/starred', img: "favorite_outline_20"}
]

export const navbarDashboardItems: SidebarItemType[] = [
    {id: 5, pageName: "Дашборды", link: '/dashboards', img: "square_split_4_outline_20"},
    {id: 6, pageName: "Датасеты", link: '/datasets', img: "table_header_outline_20"},
    {id: 7, pageName: "Подключения", link: '/connections', img: "flash_outline_20"}
]

export const navbarUserItems: SidebarItemType[] = [
    {id: 8, link: '/notifications', pageName: "Уведомления", img: "notification_outline_20"},
    {id: 9, link: '/support', pageName: "Поддержка", img: "help_outline_20",},
    {id: 10, link: '/settings', pageName: "Настройки", img: "gear_outline_20",},
]