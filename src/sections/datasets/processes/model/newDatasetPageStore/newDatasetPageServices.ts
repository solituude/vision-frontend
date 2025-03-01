import {DatasetPageStoreType} from "datasets/processes/model/types";

export const newDatasetPageServices = (store: DatasetPageStoreType) => ({
    setShowMassActionsView: () => {
        store.showMassActionsView = !store.showMassActionsView;
    },
    setCountVisibleRows: (count) => {
        const numCount = Number(count);
        isNaN(numCount) ? store.countVisibleRows = 100 : store.countVisibleRows = numCount;

        const data: any[] = [];
        for (let row = 0; row < Math.min(store.countVisibleRows, store.initData.length); row++) {
            data.push(store.initData[row]);
        }
        store.dataset = {
            ...store.dataset,
            data
        }
    },

    setChosenColumn: (e, id: number, columnName: string) => {
        console.log(e);
        const positionTableDiv = e?.target.offsetParent?.offsetParent.offsetLeft;
        const positionPopupLeftByColumn = e?.clientX - e?.nativeEvent.offsetX - 320;
        const positionPopupRightByColumn = e?.clientX - e?.nativeEvent.offsetX + e.target.offsetWidth + 10;
        store.chosenColumn = {
            columnName,
            data: e ? store.dataset.data.map(d => d[e.target.cellIndex]) : [],
            position: positionPopupLeftByColumn - 100 > positionTableDiv ?
                positionPopupLeftByColumn : positionPopupRightByColumn,

            id
        }
    },
    /**
     * Назначение нового датасета
     * Собирается объект датасета с колонками (название и видимость) и данными таблицы по строкам
     * */
    setDataset: () => {
        const columns = Object.keys(store.initData[0]).map((c) => ({
            accessorKey: c,
            header: c,
            visible: true,
            type: "Строка",
            source: 'Датасет 1',
            description: 'hehe'
        }));
        const data: any[] = [];
        for (let row = 0; row < Math.min(store.countVisibleRows, store.initData.length); row++) {
            data.push(store.initData[row]);
        }
        store.dataset = {
            columns,
            data
        }
    },
    updateColumnTitle: (prevTitle: string, newTitle: string) => {
        const id = store.chosenColumn.id;
        const columns = store.dataset.columns;
        if (newTitle !== '') {
            columns[id].accessorKey = newTitle;
            columns[id].header = newTitle;
            const updateData = store.dataset.data.map(d => {
                d[newTitle] = d[prevTitle];
                delete d[prevTitle];
                return d;
            });
            store.dataset = {...store.dataset, data: updateData, columns};
        } else if (prevTitle === ' ') {
            console.error('Не может быть пустого названия')
        }
        else {
            columns[id].accessorKey = ' ';
            columns[id].header = ' ';
            const updateData = store.dataset.data.map(d => {
                d[' '] = d[prevTitle];
                delete d[prevTitle];
                return d;
            });
            store.dataset = {...store.dataset, data: updateData, columns};
        }
    },

    hideColumn: (id: number = store.chosenColumn.id, isVisible: undefined | boolean) => {
        const columns = store.dataset.columns;
        columns[id].visible = isVisible ?? !columns[id].visible;

        store.dataset = {
            ...store.dataset,
            columns
        }
    }
})



