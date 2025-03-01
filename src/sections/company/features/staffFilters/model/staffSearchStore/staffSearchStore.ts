import {ROLES} from "common/entities/staff";
import {buildStore} from "common/shared/tools/incrumStore/store";
import {SortType} from "common/entities/connections/model";

type StaffSearchType = {
    inputText: string,
    inputRole: ROLES[],
    inputSortType: SortType,
    isFetching: boolean
}

const initialState: StaffSearchType = {
    inputText: "",
    inputRole: [],
    inputSortType: 'new-first',

    isFetching: false
}

export const staffSearchStore = buildStore(initialState);