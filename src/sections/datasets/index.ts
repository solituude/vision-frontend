export {AccessToDatasetModal} from './features/accessToDatasetModal';
export {DeleteDatasetModal} from './features/deleteDatasetModal';
export {SearchDatasets} from './features/searchDatasets';
export {CreateDatasetPage} from './pages/createDatasetPage';
export {DatasetsPage} from './pages/datasetsPage';
export {newDatasetPageStore, newDatasetPageServices} from './processes/model';
export type {DatasetPageStoreType} from './processes/model';
export {getLabelByWindowWidth, useObserveContainerSize} from './shared/lib';
export {BackToDatasets} from './widgets/backToDatasets';
export {ConnectionSettingsView} from './widgets/connectionSettings';
export {DatasetsTable} from './widgets/datasetsTable';
export {DataTable} from './widgets/dataTable';
export {FilterDatasets} from './widgets/filterDatasets';
export {MassActionsView} from './widgets/massActions';
export {PanelNewDataset} from './widgets/panelNewDataset';
import React, {MutableRefObject} from "react";
// types.ts
export interface ModuleExports {
    AccessToDatasetModal?: React.FC;
    DeleteDatasetModal?: React.FC;
    SearchDatasets?: React.FC;
    CreateDatasetPage?: React.FC;
    DatasetsPage?: React.FC;
    newDatasetPageStore?: any;
    newDatasetPageServices?: any;
    getLabelByWindowWidth?: (width: number) => string;
    useObserveContainerSize?: (dataTableContainerRef: MutableRefObject<HTMLElement | null>) => MutableRefObject<HTMLElement | null>;
    BackToDatasets?: React.FC;
    ConnectionSettingsView?: React.FC;
    DatasetsTable?: React.FC;
    DataTable?: React.FC;
    FilterDatasets?: React.FC;
    MassActionsView?: React.FC;
    PanelNewDataset?: React.FC;
}

// const modules = import.meta.glob<ModuleExports>("./**/*.ts");
// console.log(modules)
// const getDatasetModule = (name?:string) => {
//
//     const moduleExports: Record<string, any> = {};
//
//     Object.entries(modules).forEach(([path, mod]) => {
//         console.log(path, mod)
//         Object.entries(mod).forEach(([key, value]) => {
//             moduleExports[key] = value;
//         });
//     });
//     if (name) {
//         return moduleExports[name];
//     } else return moduleExports;
//
// }
//
//
// export default getDatasetModule;