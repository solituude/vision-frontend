import {FC} from "react";
import {Navigate} from "react-router-dom";
import {AuthView} from "app/ui/authView/authView";

type ProtectedRouteProps = {
    isAuthenticated: boolean,
    hasSub: boolean
}

export const HasSubProtectedRoute: FC<ProtectedRouteProps> = ({isAuthenticated, hasSub}) => {
    return isAuthenticated && !hasSub ? <AuthView/> : <Navigate to={'/'} replace/>
}