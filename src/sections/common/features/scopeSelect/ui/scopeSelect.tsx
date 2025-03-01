import {useEffect, useState, FC} from "react";
import {useDropdown} from "common/shared/lib/hooks";
import {useStore} from "common/shared/tools/incrumStore/store";
import {connectionsStore as store} from "common/entities/connections/model";
import s from "common/features/sourceSelect/ui/sourceSelect.module.scss";
import {Dropdown} from "common/shared/dropdown";
import {Icon} from "common/shared/lib/icons/Icon";

type ScopeSelectType = {
    setScopes: (sources: string[]) => void;
}

// TODO:
//  1. заменить подключения на пространства
//  2. ручка с получением списка пространств


export const ScopeSelect: FC<ScopeSelectType> = ({setScopes}) => {
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();
    const [connectionsStore] = useStore(store);

    useEffect(() => {
        setScopes(selectedScopes)
    }, [selectedScopes]);

    const handleCheckboxChange = (item: string) => {
        setSelectedScopes((prevSelected) => {
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
                   checked={selectedScopes.includes(item.name)}
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
                    Пространства {selectedScopes.length > 0 && " (" + selectedScopes.length + ")"}
                    {selectedScopes.length > 0 &&
                        <div id={'button-clear-source-selected'}
                             className={s.cancel__button} onClick={() => {
                            setSelectedScopes([]);
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