import {createBrowserRouter} from "react-router-dom";

import {unauthorizationRoutes} from "app/routes/unauthorizationRoutes";
import unsubscriptionRoutes from "app/routes/unsubscriptionRoutes";
import {authorizationRoutes} from "app/routes/authorizationRoutes/authorizationRoutes";

// TODO: перенести роуты в shared/routes
export const router = createBrowserRouter([
    ...unauthorizationRoutes,
    ...unsubscriptionRoutes,
    ...authorizationRoutes
]);