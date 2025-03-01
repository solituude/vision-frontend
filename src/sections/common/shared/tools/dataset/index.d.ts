import {DatasourceType, DataStatusType} from "common/shared/lib/types";

export function useDataset(request: DatasourceType, initialPayload: any, immediatelly: boolean):
    [DataStatusType, any, any, number|string];