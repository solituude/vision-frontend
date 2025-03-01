import {CreateDatasetPage, DatasetsPage} from "app/routes/pages";

export const datasetsRoutes = [
    {
        path: '/datasets',
        element: <DatasetsPage/>

    },
    {
        path: '/datasets/create',
        element: <CreateDatasetPage/>
    }
]