import {FC, useEffect, useState} from "react";

import {useStore} from "common/shared/tools/incrumStore/store";
import {connectionsStore as store} from 'common/entities/connections/model'
import {Dropdown} from "common/shared/dropdown";
import {Icon} from "common/shared/lib/icons/Icon";

import s from './sourceSelect.module.scss';
import {useDropdown} from "common/shared/lib/hooks";

type PropsType = {
    setSources: (sources: string[]) => void;
}

// TODO: добавить стиль на focus::active
export const SourceSelect: FC<PropsType> = ({setSources}) => {
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();
    const [connectionsStore] = useStore(store);

    useEffect(() => 
        setSources(selectedSources), 
    [selectedSources]);
    
    const handleCheckboxChange = (item: string) => {
        setSelectedSources((prevSelected) => {
            if (prevSelected.includes(item)) {
                const updatedSelection = prevSelected.filter(source => source !== item);
                console.log(updatedSelection);
                return updatedSelection;
            }
            const updatedSelection = [...prevSelected, item];
            console.log(updatedSelection);
            return updatedSelection;
        });
    };


    const renderListConnections = connectionsStore.connections.map((item) => (
        <div key={`source-select-list-connections-${item.name}`} className={s.dropdown__item}>
            <input className={s.custom__radio}
                   type="checkbox"
                   value={item.name}
                   key={`source-select-form-check-${item.name}`}
                   checked={selectedSources.includes(item.name)}
                   onChange={(e) => handleCheckboxChange(e.target.value)}
                   id={`source-select-form-check-${item.name}`}
            />
            <label htmlFor={`source-select-form-check-${item.name}`}>
                <div className={s.item__info}>
                    <img alt={item.name} width={28} src={item.img}/>
                    <span>{item.name}</span>
                </div>
            </label>
        </div>

    ));

    return (
        <div className={s.select__button}>
            <Dropdown label={
                <div className={s.source_select__dropdown}>
                    Источник {selectedSources.length > 0 && " (" + selectedSources.length + ")"}
                    {selectedSources.length > 0 &&
                        <div id={'button-clear-source-selected'}
                             className={s.cancel__button} onClick={() => {
                            setSelectedSources([]);
                        }}>
                            <Icon name={"cancel_16"} color={"--icon-secondary"} width={16} height={16}/>
                        </div>}
                </div>
            }
                      showDropdown={showDropdown}
                      handleCloseDropdown={handleCloseDropdown}
                      handleOpenDropdown={handleOpenDropdown}>
                <div className={s.dropdown__container}>
                    {renderListConnections}
                </div>
            </Dropdown>
        </div>
    )
}