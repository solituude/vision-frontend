import {useStore} from "common/shared/tools/incrumStore/store";
import {ChartType, visualizationStore} from "dashboard/entities/charts/model/visualizationStore";

import {BarChartConfig}      from "../ui/chartConfigs/barChartConfig";
import {StackedBarsConfig}   from "../ui/chartConfigs/stackedBarsConfig";
import {ScatterPlotConfig}   from "../ui/chartConfigs/scatterPlotConfig";
import {SplitBarsConfig}     from "../ui/chartConfigs/splitBarsConfig";
import {BulletBarsConfig}    from "../ui/chartConfigs/bulletBarsConfig";
import {ArrowPlotConfig}     from "../ui/chartConfigs/arrowPlotConfig";
import {DotPlotConfig}       from "../ui/chartConfigs/dotPlotConfig";
import {RangePlotConfig}     from "../ui/chartConfigs/rangePlotConfig";
import {ElectionDonutConfig} from "../ui/chartConfigs/electionDonutConfig";

export const ChartConfigDistributor = () => {
    const [store] = useStore(visualizationStore);
    switch (store.type) {
        case ChartType.BarChart:      return <BarChartConfig/>;
        case ChartType.StackedBars:   return <StackedBarsConfig/>;
        case ChartType.ScatterPlot:   return <ScatterPlotConfig/>;
        case ChartType.SplitBars:     return <SplitBarsConfig/>;
        case ChartType.BulletBars:    return <BulletBarsConfig/>;
        case ChartType.ArrowPlot:     return <ArrowPlotConfig/>;
        case ChartType.DotPlot:       return <DotPlotConfig/>;
        case ChartType.RangePlot:     return <RangePlotConfig/>;
        case ChartType.ElectionDonut: return <ElectionDonutConfig/>;

        default: return <BarChartConfig/>;
    }
}