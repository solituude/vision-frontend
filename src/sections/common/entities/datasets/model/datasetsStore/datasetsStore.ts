import {DatasetsStateType} from "common/entities/datasets/model/types";
import AmoCRMIcon from "common/entities/connections/lib/icons/AmoCRMIcon.svg";
import CSVIcon from "common/entities/connections/lib/icons/CSVIcon.svg";
import XLSIcon from "common/entities/connections/lib/icons/XLSIcon.svg";
import {buildStore} from "common/shared/tools/incrumStore/store";

/**
 * Стор датасетов
 * @param {DatasetType[]} allDatasets   все датасеты пользователя
 * @param {DatasetType[]} currDatasets  отображаемые датасеты (например,  отфильтрованные)
 * @param {boolean} isFetching          флаг получения данных
 * */

const initialState: DatasetsStateType = {
    allDatasets: [
        {id: "1", name: "Продажи", sourceName: "Amo CRM", sourceIcon: AmoCRMIcon, ownerID: 11, ownerName: "Иван2 Иванов2", ownerEmail: "lev1@mail.ru", changingDate: "12.03.2004", access: true},
        {id: "2", name: "Продажи Полевая", sourceName: "CSV", sourceIcon: CSVIcon, ownerID: 23, ownerName: "Владимир22 Владимиров", ownerEmail: "lev2@mail.ru", changingDate: "30.09.2015", access: true},
        {id: "3", name: "Активные сотрудники", sourceName: "XLS", sourceIcon: XLSIcon, ownerID: 24, ownerName: "Наталья2 Наталья", ownerEmail: "lev3@mail.ru", changingDate: "15.12.2022", access: true},
        {id: "4", name: "Динамика цен", sourceName: "Amo CRM", sourceIcon: AmoCRMIcon, ownerID: 25, ownerName: "Илья2 Ивлев", ownerEmail: "lev4@mail.ru", changingDate: "19.02.2023", access: false},
        {id: "5", name: "Цены конкурентов", sourceName: "Amo CRM", sourceIcon: AmoCRMIcon, ownerID: 26, ownerName: "Тимофей2 Тимофеев", ownerEmail: "lev5@mail.ru", changingDate: "17.05.2022", access: false},
        {id: "6", name: "Продажи", sourceName: "Amo CRM", sourceIcon: AmoCRMIcon, ownerID: 27, ownerName: "Артемий2 Артемов", ownerEmail: "lev6@mail.ru", changingDate: "04.03.2024", access: true},
        {id: "7", name: "Лучшие товары", sourceName: "Amo CRM", sourceIcon: AmoCRMIcon, ownerID: 28, ownerName: "Максим2 Максимов", ownerEmail: "lev7@mail.ru", changingDate: "18.04.2024", access: true},
        {id: "8", name: "Продажи очень длинное название не помещается в строку", sourceName: "Amo CRM", sourceIcon: AmoCRMIcon, ownerID: 29, ownerName: "Евгений2 Евгеньев", ownerEmail: "lev8@mail.ru", changingDate: "04.03.2024", access: false},
        {id: "9", name: "Цены конкурентов", sourceName: "Amo CRM", sourceIcon: AmoCRMIcon, ownerID: 30, ownerName: "Лев Бедняков", ownerEmail: "lev9@mail.ru", changingDate: "04.03.2024", access: true},
        {id: "10", name: "Продажи очень длинное название не помещается в строку", sourceName: "Amo CRM", sourceIcon: AmoCRMIcon, ownerID: 19, ownerName: "Константин Константинов", ownerEmail: "lev10@mail.ru", changingDate: "04.03.2024", access: true},
    ],

    currDatasets: [],
    isFetching: false
}

export const datasetsStore = buildStore(initialState);

