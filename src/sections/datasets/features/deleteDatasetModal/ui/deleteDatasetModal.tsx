import {Modal} from "common/shared/modal";
import {FC} from "react";
import {Button} from "common/shared/button";
import {Icon} from "common/shared/lib/icons/Icon";

import s from './deleteDatasetModal.module.scss';

type PropsType = {
    datasetName: string,
    connectedDashboards: string[],
    accessType: string,
    closeModal: () => void
}

export const DeleteDatasetModal: FC<PropsType> = (props) => {
    return (
        <div className={s.modal__container}>
            <Modal headerText={`Удаление датасета "${props.datasetName}"`}
                   component={
                       <div className={s.main__content}>
                           <div className={s.top__content}>
                               <div className={s.alert__container}>
                                   <div className={s.alert__header}>
                                       <Icon name={"warning_triangle_outline_24"} color={"--icon-negative"}
                                             width={24} height={24}/>
                                       <span className={s.alert__label}>Внимание</span>
                                   </div>

                                   <span className={s.alert__text}>При удалении датасета «{props.datasetName}» вы потеряете часть данных в связанных объектах ниже</span>
                               </div>

                               <div className={s.datasets__list}>
                                   {props.connectedDashboards.map((ds, index) => (
                                       <div key={`ds-${ds}-${index}`} className={s.dataset__container}>
                                           <Icon name={"dashboard_28"} height={28} width={28}/>
                                           <span className={s.dataset__name}>{ds}</span>
                                       </div>
                                   ))}
                               </div>
                               <span className={s.regular__text}> Вы уверены, что хотите удалить данный датасет?</span>
                           </div>

                           <hr/>
                           <div className={s.button__container}>
                               <Button label={"Отмена"} className={"secondary"} size="small" fullWidth={true}/>
                               <Button label="Удалить" className="negative" size="small" fullWidth={true}/>
                           </div>
                       </div>
                   }
                   handleClose={props.closeModal}/>
        </div>

    )
}