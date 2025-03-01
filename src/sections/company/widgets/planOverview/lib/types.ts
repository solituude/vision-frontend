import {LicenseType} from "company/pages/plansPage/lib/types";

type FeaturesLocalType = {
    label: string,
    list: string[]
}

export type PlansInfoType = {
    id: number
    name: string;
    pricePerMonth: number | null;
    pricePerMonthSale: number | null;
    labelFeatures: string,
    features: FeaturesLocalType[] ;
}

export type OpenProps = {
    isOpen: boolean,
    info: LicenseType
}