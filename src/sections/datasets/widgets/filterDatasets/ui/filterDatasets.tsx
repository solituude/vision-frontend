import {useEffect, useState} from "react";

import {FiltersType} from "common/shared/lib/types";
import {useStore} from "common/shared/tools/incrumStore/store";
import {datasetsStore, datasetsServices} from "common/entities/datasets/model";
import {SortSelect} from "common/features/sortSelect";
import {DateChangingSelect} from "common/features/dateChangingSelect";
import {AccessSelect} from "common/features/accessSelect";
import {SourceSelect} from "common/features/sourceSelect";
import {OwnerSelect} from 'common/features/ownerSelect';
import {SearchInput} from "common/features/searchInput";

import s from "./filterDatasets.module.scss";

export const FilterDatasets = () => {
    const [filters, setFilters] = useState<FiltersType>({
        name: '', sortBy: "new-first", dateChanging: '', sources: [], owners: [], access: "Все"
    });

    const [, servicesDS] = useStore(datasetsStore, datasetsServices);

    useEffect(() => {
        servicesDS.sortDatasets(filters);
    }, [filters.name, filters.sortBy, filters.dateChanging, filters.sources, filters.owners, filters.access])
    return (
        <section className={s.filters__container}>
            <SearchInput key={`datasets-search-dataset`} placeholder={"Поиск..."} setName={(text) => setFilters({...filters, name: text})}/>
            <SortSelect sortedBy={filters.sortBy} setSortedBy={(sortBy) => setFilters({...filters, sortBy: sortBy})}/>

            <DateChangingSelect setDateProps={(dateChanging) => setFilters({...filters, dateChanging})}
                                key={`datasets-date-changing-select`}/>
            <AccessSelect accessSelect={filters.access} key={`datasets-access-select`} setAccess={(access) => setFilters({...filters, access})}/>
            <SourceSelect setSources={(sources) => setFilters({...filters, sources})}/>
            <OwnerSelect key={`owner-select-dataset`} setOwners={(owners) => setFilters({...filters, owners})}/>
        </section>
    )
}