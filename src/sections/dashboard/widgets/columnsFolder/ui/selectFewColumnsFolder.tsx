import {useEffect} from "react";

import {useStore} from "common/shared/tools/incrumStore/store";
import {DropdownFolder} from "dashboard/shared/folder";
import {SelectFewColumns} from "dashboard/features/selectFewColumns";
import {visualizationStore} from "dashboard/entities/charts";

export const SelectFewColumnsFolder = () => {
    const [store] = useStore(visualizationStore);

    useEffect(() => {
        store.config = {...store.config, chosenColumns: []};
    }, []);

    return (
        <DropdownFolder icon={'rectangles_2_outline_24'} label={'Колонки'}>
            <SelectFewColumns/>
        </DropdownFolder>
    )
}