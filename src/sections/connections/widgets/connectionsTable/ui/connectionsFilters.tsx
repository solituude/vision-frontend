import {useStore} from "common/shared/tools/incrumStore/store";
import {SortSelect} from "common/features/sortSelect";
import {SearchInput} from "common/features/searchInput";
import {DateChangingSelect} from "common/features/dateChangingSelect";
// import {OwnerSelect} from "common/features/ownerSelect";
import {ScopeSelect} from "common/features/scopeSelect";
import {FilteredConnectionsStoreType, filteredConnectionStore} from "connections/widgets/connectionsTable";

import s from './connectionTable.module.scss';

//TODO: безопасно скопировать массив владельцев

export const ConnectionsFilters = () => {
    const [store]: FilteredConnectionsStoreType[] = useStore(filteredConnectionStore);

    return(
        <div className={s.filters__container}>
            <SearchInput placeholder={"Название"} setName={(newName) => store.name = newName}/>
            <SortSelect sortedBy={store.sortType} setSortedBy={(newT) => store.sortType = newT}/>
            <DateChangingSelect setDateProps={(newDate) => store.dateChanging = newDate}/>
            <ScopeSelect setScopes={(newScopes) => store.space = [...newScopes]}/>
            {/*<OwnerSelect key={`owner-select-connections`} setOwners={(newOwners) => store.owners = [...newOwners]}/>*/}
        </div>
    )
}