import {useEffect} from "react";

import {useStore} from "common/shared/tools/incrumStore/store";
import {ChartType, visualizationStore} from "./visualizationStore";
import {BAR_CHART_DEFAULT_CONFIG} from "./constants";

export const useConfig = () => {
    const [store] = useStore(visualizationStore);
    useEffect(() => {
        if (store.type === ChartType.BarChart && store.config === null) {
            store.config = BAR_CHART_DEFAULT_CONFIG;
        }
    }, []);
}
