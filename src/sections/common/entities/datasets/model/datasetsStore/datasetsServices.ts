import {FiltersType} from "common/shared/lib/types";
import {getFilteredDatasets} from "common/entities/datasets/model/filtersUtils";

export const datasetsServices = (store) => ({
    sortDatasets: (filters: FiltersType) => {
        store.currDatasets = getFilteredDatasets(filters);
        console.log("Датасеты отсортированы");
    }
})