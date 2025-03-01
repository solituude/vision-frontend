import {MainEditPage, MainPage} from "app/routes/pages";
import {isSub} from "app/lib";

export const mainRoutes = [
    {
        path: '/',
        element: <MainPage/>,
        index: isSub
    },
    {
        path: '/main',
        element: <MainPage/>,
        children: [
            {
                path: '/main/mainPage/edit/:id',
                element: <MainEditPage/>
            },]
    },
    {
        path: '/company',
        element: <div>папка компании</div>
    },
    {
        path: '/starred',
        element: <div>Избранное</div>
    },
]