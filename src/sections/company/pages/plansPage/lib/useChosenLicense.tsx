import {useEffect, useState} from "react";

import Cookies from "universal-cookie";

import {OpenProps} from "company/widgets/planOverview/lib";
import {LicenseType} from "company/pages/plansPage/lib/types";

export const useChosenLicense = () => {
    const cookie = new Cookies();
    const [chosenLicenseInfo, setChosenLicenseInfo] = useState(cookie.get("company-info").license);
    const [openModal, setOpenModal] = useState<OpenProps>({isOpen: false, info: {} as LicenseType});

    useEffect(() => {
        setChosenLicenseInfo(cookie.get("company-info").license);
    }, [openModal]);

    return {chosenLicenseInfo, openModal, setOpenModal};
}