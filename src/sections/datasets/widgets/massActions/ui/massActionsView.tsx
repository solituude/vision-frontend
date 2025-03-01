import {useState} from "react";

import {ResizableBlock} from "common/shared/resizableBlock";
import {useStore} from "common/shared/tools/incrumStore/store";
import {Button} from "common/shared/button";
import {Dropdown} from "common/shared/dropdown";
import {Icon} from "common/shared/lib/icons/Icon";
import {useChoiceAllColumns} from "datasets/widgets/massActions";
import {MASS_ACTION_VIEW_SIZE} from "datasets/widgets/massActions/lib/constants";
import {newDatasetPageServices} from "datasets/processes/model";
import {newDatasetPageStore} from "datasets/processes/model";

import s from './massActionsView.module.scss';

// todo: добавить типы данных

export const MassActionsView = () => {
    const [store, services] = useStore(newDatasetPageStore, newDatasetPageServices);
    const {choiceColumn, setChoiceColumn} = useChoiceAllColumns();
    const [choiceAll, setChoiceAll] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0)
    const disabledButtons: boolean = count === 0;

    const handleChoiceAll = (isChoice: boolean) => {
        const keys = Object.keys(choiceColumn);
        console.log(keys);
        const newObj = {}
        for (const k in keys) {
            newObj[keys[k]] = isChoice;
        }
        setChoiceColumn(newObj);
        setChoiceAll(isChoice);
        setCount(isChoice ? keys.length : 0);
    }

    const handleChoiceColumn = (key: string) => {
        setChoiceColumn({
            ...choiceColumn,
            [key]: !choiceColumn[key]});
        setChoiceAll(choiceAll && !choiceColumn[key]);
        setCount(!choiceColumn[key] ? count + 1 : count - 1);
    }

    const handleChangeVisibilityColumn = (isShow: boolean) => {
        const columns = store.dataset.columns;
        for (let i = 0; i < columns.length; i++) {
            if (choiceColumn[columns[i].header]) services.hideColumn(i, isShow);
        }
    }

    return (
        <ResizableBlock initialSize={MASS_ACTION_VIEW_SIZE} direction="n">
            <div className={s.mass_actions_view__container}>
                <div className={s.mass_actions_view__header}>
                    <span className={s.header__title}>
                        Массовые действия
                    </span>

                    <button onClick={services.setShowMassActionsView}>
                        <Icon name={"cancel_24"} color={"--icon-secondary"} width={24} height={24}/>
                    </button>
                </div>

                <div className={s.panel__container}>
                    <span className={s.choice_col__text}>Выбрано: {count} колонок</span>
                    <div className={s.buttons__container}>
                        <Dropdown label={"Тип"} showDropdown={false}
                                  handleCloseDropdown={() => {}}
                                  handleOpenDropdown={() => {}}>

                        </Dropdown>
                        <Button onClick={() => handleChangeVisibilityColumn(false)} label={"Скрыть"} className={"secondary"} img={"hide_outline_24"}
                                imgColor={"--icon-accent"} size={"small"} disabled={disabledButtons}/>
                        <Button onClick={() => handleChangeVisibilityColumn(true)} label={"Показать"} className={"secondary"} img={"view_outline_24"}
                                imgColor={"--icon-accent"} size={"small"} disabled={disabledButtons}/>
                        <Button label={"Удалить"} className={"negative_secondary"} img={"delete_outline_24"}
                                imgColor={"--icon-negative"} size={"small"} disabled={disabledButtons}/>
                        <button onClick={() => handleChoiceAll(false)}>
                            <Icon name={"cancel_24"} color={"--icon-accent"} width={24} height={24}/>
                        </button>
                    </div>
                </div>
                <div className={s.columnInfo__container}>
                    <table className={s.columnInfo__table}>
                        <thead className={s.columnInfo__item}>
                        <tr>
                            <th className={s.checkbox__column}>
                                <input checked={choiceAll}
                                       onChange={() => handleChoiceAll(!choiceAll)} type={"checkbox"}/>
                            </th>
                            <th className={s.name__column}><span>Название колонки</span></th>
                            <th className={s.type__column}><span>Тип</span></th>
                            <th className={s.info__column}><span>Источник</span></th>
                            <th className={s.info__column}><span>Описание</span></th>
                            <th className={s.checkbox__column}/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            store.dataset.columns.map((c, ind) => (
                                <tr key={`mass-action-view-${c.header}`} className={s.columnInfo__item}>
                                    <td className={s.checkbox__column}>
                                        <input checked={choiceColumn[c.header] ?? false}
                                               onChange={() => {handleChoiceColumn(c.header)}}
                                               type={"checkbox"}/></td>
                                    <td className={s.name__column}>{c.header}</td>
                                    <td className={s.type__column}>{c.type}</td>
                                    <td className={s.info__column}>{c.source}</td>
                                    <td className={s.info__column}>{c.description}</td>
                                    <td className={s.checkbox__column}>
                                        <button className={s.visible__button} onClick={() => services.hideColumn(ind)}>
                                            {c.visible ?
                                            <Icon name={'view_outline_24'} height={24} width={24}
                                                  color={'--icon-accent'}/> :
                                            <Icon name={'hide_outline_24'} width={24} height={24}
                                                  color={'--icon-accent'}/>}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </ResizableBlock>
    )
}