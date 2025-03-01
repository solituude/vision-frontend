import {DateSelectEnum, FiltersType} from "common/shared/lib/types";
import {parseDate} from "common/shared/lib/utils";
import {datasetsStore} from "common/entities/datasets/model/datasetsStore/datasetsStore";

const MY_NAME = 'Лев Бедняков'


/**
 * TODO: передавать тип фильтрации и по нему фильтровать, чтобы лишний раз не накладывать сортировки и поиск
 *
 * Функция получения отфильтрованных датасетов
 *
 * @param {FiltersType} filters  фильтры датасета (название, сортировка, дата, доступ, источники, владелец)
 * @param {string} typeFilter тип применяемого фильтра (по названию, по дате и тд)
 * @return {DatasetType[]}       отфильтрованные датасеты
 * */

export const getFilteredDatasets = (filters: FiltersType) => {

    const datasets = datasetsStore.allDatasets;
    // поиск по имени
    let filteredDatasets = datasets?.filter(ds => ds.name.toLocaleLowerCase().includes(filters.name?.toLocaleLowerCase() || ''))
        // фильтр по источникам
        .filter(ds => filters.sources?.length === 0 ? true : filters.sources?.toString().includes(ds.sourceName))
        // фильтр по владельцам
        .filter(ds => filters.owners?.length === 0 ? true : filters.owners?.includes(ds.ownerID))
        // доступ
        .filter(ds => filters.access === "Личное" && ds.ownerName === MY_NAME || filters.access === "Общее" || filters.access === "Все");

    // сортировка по...
    filters.sortBy === "alphabetically" && filteredDatasets.sort((a, b) => a.name.localeCompare(b.name));
    filters.sortBy === "non-alphabetically" && filteredDatasets.sort((a, b) => b.name.localeCompare(a.name));
    filters.sortBy === "old-first" && filteredDatasets.sort((a, b) => parseDate(a.changingDate).getTime() - parseDate(b.changingDate).getTime());
    filters.sortBy === "new-first" && filteredDatasets.sort((a, b) => parseDate(b.changingDate).getTime() - parseDate(a.changingDate).getTime());

    // дата изменения
    const dateFilter = filters.dateChanging?.split(' ');
    const today = new Date();
    let fromDate: Date;
    let toDate: Date;
    // console.log(dateFilter)

    if (dateFilter) {
        switch (dateFilter[0]) {
            case DateSelectEnum.TODAY:
                filteredDatasets = filteredDatasets.filter(ds => ds.changingDate === today.toLocaleDateString("ru"));
                break;
            case DateSelectEnum.LAST_7_DAYS:
                filteredDatasets = filteredDatasets.filter(ds => {
                    const [day, month, year] = ds.changingDate.split('.').map(Number);
                    const currDate = new Date(year, month - 1, day);
                    return currDate >= today && currDate <= new Date(today.setDate(today.getDate() + 7));
                });
                break;
            case DateSelectEnum.LAST_30_DAYS:
                filteredDatasets = filteredDatasets.filter(ds => {
                    const [day, month, year] = ds.changingDate.split('.').map(Number);
                    const currDate = new Date(year, month - 1, day);
                    return currDate >= today && currDate <= new Date(today.setMonth(today.getMonth() + 1));
                });
                break;
            case DateSelectEnum.THIS_YEAR:
                filteredDatasets = filteredDatasets.filter(ds => {
                    console.log(ds.changingDate)
                    const [day, month, year] = ds.changingDate.split('.').map(Number);
                    const currDate = new Date(year, month - 1, day);
                    console.log(currDate)
                    return currDate.getFullYear() === today.getFullYear();
                });
                break;
            case DateSelectEnum.LAST_YEAR:
                filteredDatasets = filteredDatasets.filter(ds => {
                    const [day, month, year] = ds.changingDate.split('.').map(Number);
                    const currDate = new Date(year, month - 1, day);
                    return currDate.getFullYear() === today.getFullYear() - 1;
                });
                break;
            case DateSelectEnum.CUSTOM:
                fromDate = new Date(dateFilter[4] + " " + dateFilter[2] + " " + dateFilter[3]);
                toDate = new Date(dateFilter[13] + " " + dateFilter[11] + " " + dateFilter[12]);
                console.log(typeof toDate);
                filteredDatasets = !isNaN(fromDate.getDate()) ? filteredDatasets.filter(ds => {
                    const [day, month, year] = ds.changingDate.split('.').map(Number);
                    const currDate = new Date(year, month - 1, day);
                    return currDate >= fromDate;
                }) : filteredDatasets;
                filteredDatasets = !isNaN(toDate.getDate()) ? filteredDatasets.filter(ds => {
                    const [day, month, year] = ds.changingDate.split('.').map(Number);
                    const currDate = new Date(year, month - 1, day);
                    return currDate <= toDate;
                }) : filteredDatasets;
                break;
        }
    }

    return filteredDatasets;
}