export type DatasetPageStoreType = {
    initData: any[],
    dataset: {
        columns: {
            accessorKey: string,
            header: string,
            visible: boolean,
            type?: string,
            source?: string,
            description?: string,
        }[],
        data: any[]
    },
    showMassActionsView: boolean,

    countVisibleRows: number,
    chosenColumn: {
        id: number,
        columnName: string,
        data: any[],
        position: number
    }
}