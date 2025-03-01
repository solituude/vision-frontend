export type CompanyStoreType = {
    isFetching: boolean,
    isFirstLogin: boolean,
    isFreePlanExpired: boolean,
    currPlan: string | number | null
}