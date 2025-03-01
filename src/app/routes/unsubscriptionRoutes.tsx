import {HasSubProtectedRoute} from "app/lib/protectedRoutes/hasSubProtectedRoute";
import {hasToken, isSub} from "app/lib";
import {CompanyAccountPage, ErrorPage, PlansPage} from "./pages";

const unsubscriptionRoutes = [{
    element: <HasSubProtectedRoute isAuthenticated={hasToken} hasSub={isSub}/>,
    children: [
        {
            path: '/',
            element: <CompanyAccountPage/>,
            index: !isSub
        },
        {
            path: '/support',
            element: <div>Поддержка</div>,
            index: !isSub
        },
        {
            path: '/companyaccount',
            element: <CompanyAccountPage/>,
            index: !isSub
        },
        {
            path: '/companyaccount/plans',
            element: <PlansPage/>,
            index: !isSub
        }
    ],
    errorElement: <ErrorPage/>
}]
export default unsubscriptionRoutes;