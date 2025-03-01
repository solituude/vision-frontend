import {ConnectionsStateType} from "common/entities/connections/model";
import AmoCRMIcon from "common/entities/connections/lib/icons/AmoCRMIcon.svg";
import XLSIcon from "common/entities/connections/lib/icons/XLSIcon.svg";
import CSVIcon from "common/entities/connections/lib/icons/CSVIcon.svg";
import {buildStore} from "common/shared/tools/incrumStore/store";

/**
 * @param {ConnectionType[]} connections  текущие подключения компании
 * @param {boolean} isFetching            флаг получения данных
 * */

const initialState: ConnectionsStateType = {
    connections: [
        {id: "0", name: "Amo CRM", img: AmoCRMIcon,},
        {id: "1", name: "XLS", img: XLSIcon,},
        {id: "2", name: "CSV", img: CSVIcon}
    ],
    isFetching: false
}

export const connectionsStore = buildStore(initialState);