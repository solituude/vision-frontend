import {Dropdown} from "common/shared/dropdown";
import {useDropdown} from "common/shared/lib/hooks";
import {useStore} from "common/shared/tools/incrumStore/store";
import {DatasetPageStoreType, newDatasetPageStore} from "datasets/processes/model";
import s from "dashboard/features/selectFewColumns/ui/selectFewColumns.module.scss";
// import {Select} from "common/features/select";
import {FC} from "react";
import {Select} from "common/shared/select";

// TODO: сделать связь с колонками датасета

type SelectColumnType = {
    titleAbove: string,
    onChange: (item: any) => void,
    chosenColumnAccessorKey?: string,
}

export const SelectColumn: FC<SelectColumnType> = ({titleAbove, onChange, chosenColumnAccessorKey}) => {
    const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();

    const [datasetStore] = useStore<DatasetPageStoreType>(newDatasetPageStore);
    const allColumns = datasetStore.dataset.columns;

    // const [visStore] = useStore<VisualizationStoreType>(visualizationStore);
    // const chosenColumnsKeys = visStore.config.chosenColumns.map(col => col.accessorKey);

    // const getChecked = (colHeader: string): boolean => {
    //     switch (configType){
    //         case "columns":
    //             return visStore.config.chosenColumn === colHeader;
    //         case "groupByColumn":
    //             return visStore.config.groupByColumn.column === colHeader;
    //         default: return false
    //     }
    // }
    //
    // const handleCheck = (colHeader: string) => {
    //     switch (configType){
    //         case "columns":
    //             return visStore.config.chosenColumn === colHeader;
    //         case "groupByColumn":
    //             return visStore.config.groupByColumn.column === colHeader;
    //         default: return false
    //     }
    // }

    return (
        <Dropdown titleAbove={titleAbove} label={chosenColumnAccessorKey ?? "Выберите столбец"}
                  showDropdown={showDropdown}
                  handleCloseDropdown={handleCloseDropdown}
                  handleOpenDropdown={handleOpenDropdown}>
            <div className={s.dropdown}>
                {
                    allColumns.map(col => <Select key={col.accessorKey} label={col.header}
                                                  onChange={() => onChange(col)}
                                                  isChecked={chosenColumnAccessorKey === col.accessorKey}/>)
                }
            </div>
        </Dropdown>
    )
}