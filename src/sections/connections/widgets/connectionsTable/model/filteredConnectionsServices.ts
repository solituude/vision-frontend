import {FilteredConnectionsStoreType} from "connections/widgets/connectionsTable";

export const filteredConnectionsServices = (store: FilteredConnectionsStoreType) => ({
    sortConnections: (filterType: string) => {
        console.log(store.sortType, filterType);
    }
});