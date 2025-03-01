import {
    ALIGNMENT,
    // BulletBarsConfigType,
    ScatterPlotConfigType,
    Shape,
    SORT_STRING,
    SplitBarsConfigType,
    StackedBarsConfigType
} from "dashboard/shared/lib";

export enum Axis {
    Horizontal = 'horizontal',
    Vertical = 'Vertical'
}

export const BAR_CHART_DEFAULT_CONFIG = {
    chosenColumns: undefined,
    groupByColumn: {},
    axes: {},
    captions: {},
    sort: undefined,
    view: {}
};

export const STACKED_BARS_DEFAULT_CONFIG: StackedBarsConfigType = {
    chosenColumns: [],
    groupByColumn: {
        isGroup: false, column: undefined, isDisplayGroupCaptions: false,
    },
    axes: {
        gap: {max: undefined, min: undefined},
        isDividingLine: false,
        isGrid: false
    },
    captions: {
        column: undefined,
        isDisplayGroupCaptions: false,
        alignment: ALIGNMENT.LEFT,
        floatingComma: 1,
        isColumnCaptionsOnSeparateLine: false,
        isValueWithinColumns: false,
        swapValueWithCaptions: false
    },
    sort: {
        type: SORT_STRING.NONE,
        column: undefined
    },
    view: {
        color: '#000',
        customizeColorFields: [],
        isCustomizeColor: false,
        isDividingLine: false,
        isColumnBackground: false,
        isDisplayLegend: false
    }
};

export const SCATTER_PLOT_DEFAULT_CONFIG: ScatterPlotConfigType = {
    horizontalAxis: {
        column: undefined,
        gap: {min: undefined, max: undefined},
        floatingComma: 1,
        customValues: [],
        position: '',
        sort: SORT_STRING.NONE,
        isGrid: true,
        isLabelValuesOnAxis: true,
    },
    verticalAxis: {
        column: undefined,
        gap: {min: undefined, max: undefined},
        floatingComma: 1,
        customValues: [],
        position: '',
        sort: SORT_STRING.NONE,
        isGrid: true,
        isLabelValuesOnAxis: true,
    }, view: {
        common: {
            color: "#000",
            shape: Shape.Circle,
            size: 1,
            opacity: 100,
            pointsOutline: {
                isOutline: true,
                color: '#023999',
                opacity: 100,
                width: 1
            }
        },
        isConfigIndividually: true, customizeField: [],
        isDisplayLegend: true
    }
};

export const SPLIT_BARS_DEFAULT_CONFIG: SplitBarsConfigType = {
    chosenColumns: [],
    groupByColumn: {
        isGroup: false,
        column: undefined,
        isDisplayGroupCaptions: false
    },
    captions: {
        column: undefined,
        isColumnCaptionsOnSeparateLine: false,
        isValueWithinColumns: false,
        alignment: ALIGNMENT.LEFT,
        floatingComma: 1,
        swapValueWithCaptions: false,
        isDisplayGroupCaptions: false
    },
    sort: {
        type: SORT_STRING.NONE,
        column: undefined
    },
    axes: {
        gap: {min: undefined, max: undefined},
        isGrid: false, isDividingLine: false
    },
    view: {
        default: {
            color: '#000',
            isCustomizeColor: false,
            customizeColorFields: [],
            isDisplayLegend: false,
            isDividingLine: false,
            isColumnBackground: false
        },
        mirrorColumn: false
    }
};

// export const BULLET_BARS_DEFAULT_CONFIG: BulletBarsConfigType = {
//     columns: {
//         outerColumn: undefined,
//         innerColumn: undefined
//     },
//     groupByColumn: {
//         isGroup: false,
//         column: undefined,
//         isDisplayGroupCaptions: false
//     },
//     captions: {
//         column: undefined,
//         isColumnCaptionsOnSeparateLine: false,
//         isValueWithinColumns: false,
//         alignment: ALIGNMENT.LEFT,
//         floatingComma: 1,
//         swapValueWithCaptions: false,
//         isDisplayGroupCaptions: false
//     },
// }
