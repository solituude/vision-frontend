import s from './panelNewDataset.module.scss';
import {Button} from "common/shared/button";
import {Input} from "common/shared/input";
import {useStore} from "common/shared/tools/incrumStore/store";
import {newDatasetPageStore} from "datasets/processes/model";
import {newDatasetPageServices} from "datasets/processes/model/newDatasetPageStore/newDatasetPageServices";
import {getLabelByWindowWidth} from "datasets/shared/lib";
export const PanelNewDataset = () => {
    const [store, services] = useStore(newDatasetPageStore, newDatasetPageServices);
    return(
        <div className={s.container}>
            <div className={s.left__part}>
                <Button label={getLabelByWindowWidth("Добавить колонку")}
                        className="secondary" size="tiny"
                        img={"add_24"} imgColor={"--icon-accent"}/>
                <Button label={getLabelByWindowWidth("Массовые действия")}
                        onClick={services.setShowMassActionsView}
                        className="secondary" size="tiny"
                        img={"list_checked_outline_24"} imgColor={"--icon-accent"}/>
                <div className={s.count_row__container}>
                    <span className={s.count_col__text}>Кол-во строк:</span>
                    <Input value={store.countVisibleRows}
                           onChange={services.setCountVisibleRows}
                           type="text" size="small"/>
                    <span className={s.max_row__text}>Не больше 1000</span>
                </div>
            </div>
            <Button label="Сохранить" className="primary" size="small"/>
        </div>
    )
}