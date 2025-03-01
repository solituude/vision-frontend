import {ROLES} from "common/entities/staff";

export type StaffSearchType = {
    inputText: string,
    inputRole: ROLES[],
    inputSortType: string,
    isFetching: boolean
}