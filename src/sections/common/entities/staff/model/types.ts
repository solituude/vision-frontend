import {IUser} from "common/entities/staff";

export type StaffStoreType = {
    staff: IUser[],
    currUser: IUser | null,
    currStaff: IUser[]

    isFetching: false
}