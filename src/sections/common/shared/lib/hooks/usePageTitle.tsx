import {useEffect} from "react";
// import {useNavigate} from "react-router-dom";

export const usePageTitle = (newTitle: string, unmountTitle: string = "") => {
    // const navigate = useNavigate();
    useEffect(() => {
        document.title = `${newTitle} – Vision`;
        return () => {
            document.title = `${unmountTitle} – Vision`;
        }
    }, [newTitle, unmountTitle])
}