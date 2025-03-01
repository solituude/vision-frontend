import {buildStore} from "common/shared/tools/incrumStore/store";
import {StaffStoreType} from "common/entities/staff/model/types";

/**
 * @param {IUser[]} staff       все сотрудники компании
 * @param {IUser} currUser      выбранный сотрудник (для его редактирования)
 * @param {IUser[]} currStaff   все отображаемые в списке сотрудники
 * @param {boolean} isFetching  флаг получения данных
 * */

const initialState: StaffStoreType = {
    staff: [],
    currUser: null,
    currStaff: [],

    isFetching: false,
}

export const staffStore = buildStore(initialState);
