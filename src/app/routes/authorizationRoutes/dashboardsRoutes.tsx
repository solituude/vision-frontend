import {DashboardsPage} from "app/routes/pages";
import {NewChartPage} from "dashboard/pages/newChartPage";

export const dashboardsRoutes = [
    {
        path: '/dashboards',
        element: <DashboardsPage/>,
    },
    {
        path: '/dashboards/newChart',
        element: <NewChartPage/>
    }
]