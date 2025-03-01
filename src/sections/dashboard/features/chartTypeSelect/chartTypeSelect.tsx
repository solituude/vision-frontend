import {Button} from "common/shared/button";
import {useStore} from "common/shared/tools/incrumStore/store";
import {ChartType, visualizationStore} from "dashboard/entities/charts/model/visualizationStore";

export const ChartTypeSelect = () => {
    const [store] = useStore(visualizationStore);

    return(
        <div>
            {
                Object.values(ChartType).map(chartType => (
                    <Button key={chartType}
                        label={chartType}
                            onClick={() => {
                                store.type = chartType;
                            }}
                            className={'primary'}
                            size={'small'}/>
                ))
            }
        </div>
    )
}