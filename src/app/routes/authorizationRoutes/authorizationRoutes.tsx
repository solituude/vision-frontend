import {hasToken, isSub, ProtectedRoute} from "app/lib";
import {mainRoutes} from "app/routes/authorizationRoutes/mainRoutes";
import {companyAccountRoutes} from "app/routes/authorizationRoutes/companyAccountRoutes";
import {dashboardsRoutes} from "app/routes/authorizationRoutes/dashboardsRoutes";
import {datasetsRoutes} from "app/routes/authorizationRoutes/datasetsRoutes";
import {connectionsRoutes} from "app/routes/authorizationRoutes/connectionsRoutes";
import {notificationsRoutes} from "app/routes/authorizationRoutes/notificationsRoutes";
import {supportRoutes} from "app/routes/authorizationRoutes/supportRoutes";
import {settingsRoutes} from "app/routes/authorizationRoutes/settingsRoutes";
import {ErrorPage} from "app/routes/pages";

export const authorizationRoutes = [
    {
        element: <ProtectedRoute isAuthenticated={hasToken} hasSub={isSub}/>, // защитный слой, в котором проверяется авторизован
        // пользователь или нет, потом добавить проверку на роли
        children: [
            ...mainRoutes,
            ...companyAccountRoutes,
            ...dashboardsRoutes,
            ...datasetsRoutes,
            ...connectionsRoutes,
            ...notificationsRoutes,
            ...supportRoutes,
            ...settingsRoutes
        ],
        errorElement: <ErrorPage/>
    }
]