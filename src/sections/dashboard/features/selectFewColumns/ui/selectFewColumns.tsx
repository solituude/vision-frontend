import {useEffect, useState} from "react";

import {useDropdown} from "common/shared/lib/hooks";
import {Dropdown} from "common/shared/dropdown";
import {useStore} from "common/shared/tools/incrumStore/store";
import {Checkbox} from "common/shared/checkbox";
import {newDatasetPageStore} from "datasets/processes/model";
import {visualizationStore} from "dashboard/entities/charts";

import s from './selectFewColumns.module.scss';

export const SelectFewColumns = () => {
    // TODO: убрать это и добавить в визСтор выбранный датасет или сделать новый стор
    const [datasetStore] = useStore(newDatasetPageStore);
    const [visStore] = useStore(visualizationStore);
    const columns = datasetStore.dataset.columns;
    const chosenColumnsKeys = visStore.config.chosenColumns.map(col => col.accessorKey);
    const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();

    const [selectedColumns, setSelectedColumns] = useState<string[]>(chosenColumnsKeys);

    const handleCheckboxChange = (accessorKey: string) => {
        setSelectedColumns((prevSelected) => {
            if (prevSelected.includes(accessorKey)) {
                return prevSelected.filter(col => col !== accessorKey);
            }
            return [...prevSelected, accessorKey];
        });
    };

    useEffect(() => {
        const newChosenColumns = columns.filter(col => (selectedColumns.includes(col.accessorKey)));
        visStore.config = {...visStore.config, chosenColumns: newChosenColumns};
    }, [selectedColumns])

    const handleCustomCloseDropdown = () => {
        handleCloseDropdown();
    }

    const dropdownLabel = chosenColumnsKeys.length > 0 ? `${visStore.config.chosenColumns[0].header} 
    ${visStore.config.chosenColumns.length > 1 ? 'и еще ' + (visStore.config.chosenColumns.length - 1) : ''}`
        : 'Выберите столбцы таблицы для отображения';

    return (
        <Dropdown titleAbove={'Столбцы таблицы'}
                  label={dropdownLabel}
                  showDropdown={showDropdown}
                  handleCloseDropdown={handleCustomCloseDropdown}
                  handleOpenDropdown={handleOpenDropdown}>
            <div className={s.dropdown}>
                {
                    columns.map(col => (
                        <Checkbox key={`selectFewColumns-${col.header}`}
                                  checked={selectedColumns.includes(col.accessorKey)}
                                  label={col.header}
                                  onChecked={() => {
                                      handleCheckboxChange(col.accessorKey);
                                  }}/>
                    ))
                }
            </div>
        </Dropdown>
    )
}