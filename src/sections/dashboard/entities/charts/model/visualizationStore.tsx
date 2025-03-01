import {buildStore} from "common/shared/tools/incrumStore/store";

export enum ChartType {
    BarChart = 'BAR_CHART',
    StackedBars = 'STACKED_BARS',
    ScatterPlot = 'SCATTER_PLOT',
    SplitBars = 'SPLIT_BARS',
    BulletBars = 'BULLET_BARS',
    ArrowPlot = 'ARROW_PLOT',
    DotPlot = 'DOT_PLOT',
    RangePlot = 'RANGE_PLOT',
    ElectionDonut = 'ELECTION_DONUT'
}


export type VisualizationStoreType = {
    type: ChartType,
    config: any,
    name: string,
    description: string,
    note: string,
    isDisplayCreatorName: boolean
}


const initialState: VisualizationStoreType = {
    type: ChartType.BarChart,
    config: null,
    description: "",
    isDisplayCreatorName: true,
    name: "",
    note: "",
};

export const visualizationStore = buildStore(initialState);