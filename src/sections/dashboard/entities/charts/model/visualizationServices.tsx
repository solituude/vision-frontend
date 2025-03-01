// import {ChartType, VisualizationStoreType} from "dashboard/entities/chartConfiguration";
// import {
//     ALIGNMENT,
//     BarChartConfigType,
//     DotPlotConfigType,
//     RangePlotConfigType,
//     ScatterPlotConfigType,
//     SORT_STRING,
//     StackedBarsConfigType
// } from "dashboard/shared/lib";
//
// export const visualizationServices = (store: VisualizationStoreType) => ({
//     setType: (typeName: ChartType) => {
//         store.type = typeName;
//         switch (typeName) {
//             case ChartType.BarChart:
//                 store.config = ({
//                     chosenColumns: [],
//                     groupByColumn: {
//                         isGroup: false, column: undefined, isDisplayGroupCaptions: false,
//                     },
//                     axes: {
//                         gap: {max: undefined, min: undefined}, isDividingLine: false, isGrid: false
//                     },
//                     captions: {
//                         column: undefined,
//                         isDisplayGroupCaptions: false,
//                         alignment: ALIGNMENT.LEFT,
//                         floatingComma: 1,
//                         isColumnCaptionsOnSeparateLine: false,
//                         isValueWithinColumns: false,
//                         swapValueWithCaptions: false
//                     },
//                     sort: SORT_STRING.DESC, view: {
//                         color: '#000',
//                         customizeColorFields: [],
//                         isCustomizeColor: false,
//                         isDividingLine: false,
//                         isColumnBackground: false,
//                         isDisplayLegend: false
//                     }
//                 } as BarChartConfigType);
//                 break;
//             case ChartType.StackedBars:
//                 store.config = ({
//                     chosenColumns: [],
//                     groupByColumn: {
//                         isGroup: false, column: undefined, isDisplayGroupCaptions: false,
//                     },
//                     axes: {
//                         gap: {max: undefined, min: undefined}, isDividingLine: false, isGrid: false
//                     },
//                     captions: {
//                         column: undefined,
//                         isDisplayGroupCaptions: false,
//                         alignment: ALIGNMENT.LEFT,
//                         floatingComma: 1,
//                         isColumnCaptionsOnSeparateLine: false,
//                         isValueWithinColumns: false,
//                         swapValueWithCaptions: false
//                     },
//                     sort: {
//                         type: SORT_STRING.DESC,
//                         column: undefined
//                     },
//                     view: {
//                         color: '#000',
//                         customizeColorFields: [],
//                         isCustomizeColor: false,
//                         isDividingLine: false,
//                         isColumnBackground: false,
//                         isDisplayLegend: false
//                     }
//                 } as StackedBarsConfigType);
//                 break;
//             case ChartType.ScatterPlot:
//                 store.config = ({
//                     horizontalAxis: {
//                         column: undefined,
//                         gap: {
//                             max: undefined,
//                             min: undefined
//                         },
//                         floatingComma: 1,
//                         customValues: [],
//                         isGrid: false,
//                         sort: SORT_STRING.DESC,
//                         isLabelValuesOnAxis: false,
//                         position: ''
//                     },
//                     verticalAxis: {
//                         column: undefined,
//                         gap: {
//                             max: undefined,
//                             min: undefined
//                         },
//                         floatingComma: 1,
//                         customValues: [],
//                         isGrid: false,
//                         sort: SORT_STRING.DESC,
//                         isLabelValuesOnAxis: false,
//                         position: ''
//                     },
//                     view: {
//                         common: {
//                             color: '#000',
//                             shape: 'circle',
//                             size: 1,
//                             opacity: 100,
//                             pointsOutline: {
//                                 isOutline: false,
//                                 color: '#000',
//                                 width: 1,
//                                 opacity: 100
//                             }
//                         },
//                         isConfigIndividually: false,
//                         customizeField: [],
//                         isDisplayLegend: false
//                     }
//                 } as ScatterPlotConfigType);
//                 break;
//             case ChartType.DotPlot:
//                 store.config = ({
//                     captions: {
//                         column: undefined,
//                         alignment: ALIGNMENT.LEFT,
//                         isDisplayLegend: false,
//                     },
//                     sort: {
//                         type: SORT_STRING.DESC,
//                         column: undefined
//                     },
//                     horizontalAxis: {
//                         gap: {
//                             min: undefined,
//                             max: undefined
//                         },
//                         floatingComma: 1,
//                         customValues: undefined,
//                         position: '',
//                         isGrid: false
//                     },
//                     view: {
//                         dots: [],
//                         isDisplayLegend: false,
//                         isConnectDots: false
//                     }
//                 } as DotPlotConfigType);
//                 break;
//             case ChartType.RangePlot:
//                 store.config = ({
//                     columns: {
//                         begin: undefined, end: undefined
//                     }, captions: {
//                         column: undefined,
//                         alignment: ALIGNMENT.LEFT,
//                         displayValues: '', isDisplayColumnHeaders: false
//                     }, sort: {
//                         type: SORT_STRING.DESC, column: undefined
//                     }, view: {
//                         dots: [{}],
//                         gap: {
//                             isOutline: false, color: '#000', width: 1, opacity: 100,
//                         },
//                         isDisplayLegend: false
//                     }
//                 } as RangePlotConfigType)
//         }
//     }
// })