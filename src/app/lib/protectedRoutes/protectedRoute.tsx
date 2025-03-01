import {Navigate} from "react-router-dom";
import React from "react";
import {AuthView} from "app/ui/authView/authView";

interface ProtectedRouteProps {
    isAuthenticated: boolean,
    hasSub: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isAuthenticated, hasSub}) => {
    // return isAuthenticated && hasSub ? <AuthView/> : <Navigate to={'/'}/>
    return  <AuthView/>
}