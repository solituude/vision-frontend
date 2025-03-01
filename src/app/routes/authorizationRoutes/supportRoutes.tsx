import {isSub} from "app/lib";
import {SupportPage} from "app/routes/pages";

export const supportRoutes = [
    {
        path: '/support',
        element: <SupportPage/>,
        index: isSub
    }
]