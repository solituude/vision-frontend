import {SortType} from "common/entities/connections/model";
import {ROLES, STATUSES} from "common/entities/staff";

export type FiltersType = {
    name?: string,
    sortBy: SortType,
    dateChanging?: string,
    access: string,
    sources?: string[],
    owners?: number[]
};

export enum DateSelectEnum  {
    TODAY = "TODAY",
    LAST_7_DAYS = "LAST_7_DAYS",
    LAST_30_DAYS = "LAST_30_DAYS",
    THIS_YEAR = "THIS_YEAR",
    LAST_YEAR = "LAST_YEAR",
    CUSTOM = "CUSTOM"
}

export type DatasourceType = {
    address: string,
    payload: any,
    middleware?: any[],
    onSuccess?: any[],
    onError?: any[],
    immediatelly?: boolean,
    cacheDriver?: any,
    gc: boolean,
    fetchDriver: any
};

export type DataStatusType = {
    isIdle: boolean,
    isFirstPending: boolean,
    isPending: boolean,
    isFinished: boolean,
    isUpdating: boolean,
    isError: boolean,
    isNodata: boolean,
    asString: () => string,
    status: {
        code: number,
        message: string
    },
    progress: string
};

export type UserType = {
    id: string,
    email: string,
    companyId: string,
    firstName: string,
    surName: string,
    patronymic: string,
    role: ROLES,
    status: STATUSES,
    position: string,
    phoneNumber: string,
    createdDate: string
};

// TODO: include necessary fields
export type SpaceType = {
    id: string,
    name: string
}

export type FieldDatasetType = {
    id: string,
    name: string,
    type: string,
    description: string,
    isHidden: boolean,
    datasetId: string,
    dataset: string
};

export type ValueRecordDatasetType = {
    id: string,
    dataRecordId: string,
    dataRecord: string,
    fieldName: string,
    value: string
}

export type RecordDatasetType = {
    id: string,
    datasetId: string,
    dataset: string,
    values: ValueRecordDatasetType[]
}

export type DatasetType = {
    id: string,
    companyId: string,
    name: string,
    isExternal: boolean,
    fields: FieldDatasetType[],
    "records": RecordDatasetType[]
}

export type BarChartConfig = {

}
