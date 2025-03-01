import App from "app/app";
import {hasToken} from "app/lib";
import {LoginPage, RegistrationPage, StartPage} from "app/routes/pages";
export const unauthorizationRoutes = [{
    path: '/',
    element: <App/>,
    children: [
        {
            path: '/',
            element: <StartPage/>,
            index: !hasToken
        },
        {
            path: '/login',
            element: <LoginPage/>,
        },
        {
            path: '/register',
            element: <RegistrationPage/>
        }
    ]
}]