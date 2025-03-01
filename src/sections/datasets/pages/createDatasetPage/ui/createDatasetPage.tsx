import {useEffect} from "react";

import {usePageTitle} from "common/shared/lib/hooks";
import {useStore} from "common/shared/tools/incrumStore/store";
import {ConnectionSettingsView} from "datasets/widgets/connectionSettings";
import {MassActionsView} from "datasets/widgets/massActions";
import {BackToDatasets} from "datasets/widgets/backToDatasets";
import {PanelNewDataset} from "datasets/widgets/panelNewDataset";
import {newDatasetPageServices, newDatasetPageStore} from "datasets/processes/model";
import testData from 'datasets/shared/lib/result1.json';
import {DataTable} from "datasets/widgets/dataTable";

import s from './createDatasetPage.module.scss';

export const CreateDatasetPage = () => {
    usePageTitle("Создание датасета");
    const [store, services] = useStore(newDatasetPageStore, newDatasetPageServices);
    useEffect(() => {
        store.initData = testData;
        services.setDataset();
    }, []);
    return(
        <main className={s.content}>
            <section className={s.left__container}>
                <BackToDatasets/>
                <ConnectionSettingsView/>
            </section>
            <section className={s.right__container}>
                <PanelNewDataset/>
                <DataTable/>
                {store.showMassActionsView && <MassActionsView/>}
            </section>
        </main>
    )
}