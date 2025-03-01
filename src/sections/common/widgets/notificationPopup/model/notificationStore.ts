import {buildStore} from "common/shared/tools/incrumStore/store";

export type ErrorStoreType = {
    text: string | undefined,
    type: 'error' | 'warning' | 'done' | undefined,
    onRepair?: () => void
}

const initialState: ErrorStoreType = {
    text: undefined,
    type: undefined
}

export const notificationStore = buildStore(initialState);