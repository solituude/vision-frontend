import {FC, ReactElement} from "react";
import {requestLogout} from "common/shared/lib/middleware";
import {DataStatusType} from "common/shared/lib/types";


type PendingDataProps = {
    dataStatus: DataStatusType,
    loaderComponent: ReactElement,
    errorComponent: ReactElement
}

export const PendingData: FC<PendingDataProps> = ({dataStatus, loaderComponent, errorComponent}) => {
    if (dataStatus.status.code === 401) requestLogout();
    if (dataStatus.isIdle || dataStatus.isPending || dataStatus.isFirstPending) return loaderComponent;
    else return errorComponent;
}