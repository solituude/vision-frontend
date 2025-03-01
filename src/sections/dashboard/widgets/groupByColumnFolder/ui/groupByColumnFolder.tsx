import {useEffect, useState} from "react";

import {Checkbox} from "common/shared/checkbox";
import {ToggleFolder} from "dashboard/shared/folder";

import s from './groupByColumn.module.scss';
import {useStore} from "common/shared/tools/incrumStore/store";
import {visualizationStore} from "dashboard/entities/charts";
import {VisualizationStoreType} from "dashboard/entities/charts/model/visualizationStore";
import {GroupByColumnType} from "dashboard/shared/lib";
import {SelectColumn} from "dashboard/features/selectColumn";
import {FieldDatasetType} from "common/shared/lib/types";

const GROUP_BY_COLUMN_DEFAULT = {
    isGroup: false,
    column: undefined,
    isDisplayGroupCaptions: false
};

export const GroupByColumnFolder = () => { // у всех одинаковая
    const [visStore] = useStore<VisualizationStoreType>(visualizationStore);

    const [groupByColumnConfig, setGroupByColumnConfig] = useState<GroupByColumnType>(GROUP_BY_COLUMN_DEFAULT);

    useEffect( () => {
        visStore.config = {...visStore.config, groupByColumn: groupByColumnConfig};
    }, [groupByColumnConfig]);

    const toggleFolder = () => {
        setGroupByColumnConfig({...groupByColumnConfig, isGroup: !groupByColumnConfig.isGroup})
    }

    const handleSelectColumn = (newCol: FieldDatasetType) => {
        setGroupByColumnConfig({...groupByColumnConfig, column: newCol})
    }

    return(
        <ToggleFolder icon={'group_columns'} label={'Группировка по столбцу'}
                      isChecked={groupByColumnConfig.isGroup}
                      onChange={toggleFolder}>
            <div className={s.folder__container}>
                <SelectColumn titleAbove={'Столбец таблицы'}
                              chosenColumnAccessorKey={groupByColumnConfig.column?.id} onChange={handleSelectColumn}/>
                {/*<Dropdown label={'Выберите столбец'}*/}
                {/*          showDropdown={false} titleAbove={'Столбец таблицы'}*/}
                {/*          handleCloseDropdown={() => {}} handleOpenDropdown={() => {}}>*/}

                {/*</Dropdown>*/}
                <Checkbox label={'Отображать подписи групп'}/>
            </div>
        </ToggleFolder>
    )
}