import {useState} from "react";
import {createPortal} from "react-dom";

import {Table} from "react-bootstrap";

import {loadable} from "app/lib/loadable/loadable";
import {ActionTooltip} from "common/shared/actionTooltip";
import {useStore} from "common/shared/tools/incrumStore/store";
import {datasetsStore} from "common/entities/datasets/model";
import {Icon} from "common/shared/lib/icons/Icon";
const DeleteDatasetModal = loadable(() => import("datasets/features/deleteDatasetModal"), "DeleteDatasetModal");
const AccessToDatasetModal = loadable(() => import("datasets/features/accessToDatasetModal"), "AccessToDatasetModal");

import s from './datasetsTable.module.scss';

export const DatasetsTable = () => {
    const [storeDS] = useStore(datasetsStore);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openAccessModal, setOpenAccessModal] = useState<boolean>(false);

    const renderDatasetList = storeDS.currDatasets.map(ds => (
        <tr key={ds.id} className={s.dataset__tr}>
            <td>
                <div className={s.name__info}>
                    <span className={ds.access ? s.info__text : s.info__text_disabled}>{ds.name}</span>
                    {!ds.access && <div className={s.no_access}>
                        <Icon name={"lock_12"}
                              height={12} width={12}
                              color={"--icon-tertiary"}/>
                        <span className={s.no_access__text}>Нет доступа</span>
                    </div>}
                </div>
            </td>
            <td className={!ds.access ? s.item__disabled : undefined}>
                <div className={s.info}>
                    <img src={ds.sourceIcon} alt={ds.id.toString()}/>
                    <span className={s.info__text}> {ds.sourceName}</span>
                </div>

            </td>
            <td className={ds.access ? s.user__info : s.user__info_disabled}>
                <div className={s.user__container}>
                    <span className={s.user__name}>{ds.ownerName}</span>
                    <span className={s.info__subtitle}>{ds.ownerEmail}</span>
                </div>
            </td>
            <td className={!ds.access ? s.item__disabled : undefined}>
                <div className={s.info}>
                    <span className={s.info__text}>{ds.changingDate}</span>
                </div>
            </td>
            <td>
                <div className={s.actions__container}>
                    <ActionTooltip
                        title={ds.access ? "Редактировать" : "У вас нет прав на редактирование"}
                        arrow placement="top">
                        <div>
                            <button disabled={!ds.access}>
                                <Icon name={"pen_outline_24"} color={"--icon-accent"} width={24} height={24}/>
                            </button>
                        </div>
                    </ActionTooltip>

                    <ActionTooltip title={ds.access ? "Поделиться" : "Запросить доступ"} arrow
                                   placement="top">
                        <div>
                            <button onClick={() => setOpenAccessModal(true)} className={s.access__button}>
                                <Icon name={ds.access ? "user_add_outline_24" : "folder_simple_arrow_right_24"}
                                      width={24} height={24} color={"--icon-accent"}/>
                            </button>
                        </div>
                    </ActionTooltip>

                    <ActionTooltip title={ds.access ? "Удалить" : "У вас нет прав на удаление"}
                                   arrow placement="top">
                        <div>
                            <button onClick={() => ds.access && setOpenDeleteModal(true)}
                                    disabled={!ds.access}>
                                <Icon name={"delete_outline_24"} width={24} height={24}
                                      color={"--icon-accent"}/>
                            </button>
                        </div>
                    </ActionTooltip>
                </div>
            </td>
        </tr>
    ))
    return (
        <>
            <div className={s.table__container}>
                <Table className={s.table}>
                    <thead>
                    <tr className={s.header__tr}>
                        <td className={s.name__col}><span className={s.header__text}>Название</span></td>
                        <td className={s.source__col}><span className={s.header__text}>Источик</span></td>
                        <td className={s.owner__col}><span className={s.header__text}>Владелец</span></td>
                        <td className={s.date__col} colSpan={2}><span className={s.header__text}>Дата изменения</span>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {renderDatasetList}
                    </tbody>
                </Table>
            </div>
            {openDeleteModal && createPortal(
                <DeleteDatasetModal closeModal={() => setOpenDeleteModal(false)}
                                    datasetName={"Продажи"}
                                    connectedDashboards={["Продажи", "Выручка Сентябрь"]}
                                    accessType={"owner"}/>, document.body)}

            {openAccessModal && createPortal(
                <AccessToDatasetModal close={() => setOpenAccessModal(false)}
                                      datasetName={"Продажи"}/>, document.body)}
        </>
    )
}
