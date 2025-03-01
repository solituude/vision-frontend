import {connectionsStore, ConnectionType, SortType} from "common/entities/connections/model";
import {buildStore} from "common/shared/tools/incrumStore/store";

export type FilteredConnectionsStoreType = {
    visibleConnections: ConnectionType[],
    name: string,
    sortType: SortType,
    dateChanging: string,
    space: string[],
    owners: number[]
}

const initialStore: FilteredConnectionsStoreType = {
    visibleConnections: connectionsStore.connections,
    sortType: 'new-first',
    name: '',
    dateChanging: '',
    space: [],
    owners: []
}

export const filteredConnectionStore = buildStore(initialStore);