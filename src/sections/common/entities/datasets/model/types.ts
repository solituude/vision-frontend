export type DatasetType = {
    id: number | string,
    name: string,
    sourceName: string,
    sourceIcon: string,
    ownerID: number,
    ownerName: string,
    ownerEmail: string,
    changingDate: string,
    access: boolean
}

export type DatasetsStateType = {
    allDatasets: DatasetType[],
    currDatasets: DatasetType[],
    isFetching: boolean
}
