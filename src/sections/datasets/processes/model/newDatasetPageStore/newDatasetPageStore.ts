import {buildStore} from "common/shared/tools/incrumStore/store";
import {DatasetPageStoreType} from "datasets/processes/model/types";

/**
 * Состояние страницы создания датасета
 * @param initData            изанчальные данные в виде JSON
 * @param dataset             обработанные данные для отображения в виде таблицы
 * @param showMassActionsView отображение окна массовых действий над таблицей
 * @param countVisibleRows    количество отображаемых строк таблицы датасета
 * @param chosenColumn        информация о выбранной колонке: данные и название колонки
 * */

const initialState: DatasetPageStoreType = {
    initData: [],
    dataset: {
        columns: [],
        data: []
    },
    showMassActionsView: false,
    countVisibleRows: 100,
    chosenColumn: {
        data: [],
        columnName: '',
        id: -1,
        position: 0,
    }
}

export const newDatasetPageStore = buildStore(initialState);