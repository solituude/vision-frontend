import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const useCheckLocation = () => {
    const location = useLocation();
    const [currLink, setCurrLink] = useState(window.location.pathname);
    useEffect(() => {
        setCurrLink(window.location.pathname);
    }, [location]);
    return [currLink];
}