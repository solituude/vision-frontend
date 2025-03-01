
import {useStore} from "common/shared/tools/incrumStore/store";
import {visualizationStore} from "dashboard/entities/charts/model/visualizationStore";
import {useEffect} from "react";

export const BarChart = () => {
    const [store] = useStore(visualizationStore);
    useEffect(() => {
        console.log(store.config);
    }, [store.config])
    return(
        <h2>BarChart</h2>
    )
}