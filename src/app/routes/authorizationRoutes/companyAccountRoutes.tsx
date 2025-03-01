import {CompanyAccountPage, PlansPage, StaffAddPage, StaffEditPage, StaffPage} from "app/routes/pages";
import {isSub} from "app/lib";

export const companyAccountRoutes = [
    {
        path: '/companyaccount',
        element: <CompanyAccountPage/>,
        index: isSub
    },
    {
        path: '/companyaccount/plans',
        element: <PlansPage/>,
        index: isSub
    },
    {
        path: '/companyaccount/staff',
        element: <StaffPage/>,
        children: [
            {
                path: '/companyaccount/staff/edit/:id',
                element: <StaffEditPage/>
            },
            {
                path: '/companyaccount/staff/add',
                element: <StaffAddPage/>
            }
        ]
    }
]