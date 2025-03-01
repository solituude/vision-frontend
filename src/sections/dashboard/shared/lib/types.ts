import {FieldDatasetType} from "common/shared/lib/types";
export enum ALIGNMENT {
    RIGHT = 'right',
    LEFT = 'left'
}

export enum SORT_STRING {
    DESC = 'desc',
    ASC = 'asc',
    NONE = 'none'
}

export enum SORT_STRING_4 {
    DESC = 'desc',
    ASC = 'asc',
    ALPH = 'alph',
    NON_ALPH = 'non_alph'
}

export enum Shape {
    Circle = 'circle',
    Square = 'square',
    Triangle = 'triangle'
}

export type GapType = {
    min?: number,
    max?: number
}

export type AxesCommonType = {
    column?: FieldDatasetType,
    gap: GapType,
    floatingComma: number,
    customValues?: number[],
    position: string,
    sort: SORT_STRING,
    isGrid: boolean,
    isLabelValuesOnAxis: boolean
}

export type OutlineType = {
    isOutline: boolean,
    color: string,
    width: number,
    opacity: number
}

export type DotConfigType = {
    color: string,
    shape: string,
    size: number,
    opacity: number,
    pointsOutline: OutlineType
};

export type IndividualDotConfigType = {
    fieldId: string,
    config: DotConfigType,
    isIncludeLegend: boolean
}

export type SortType = {
    type: SORT_STRING,
    column?: FieldDatasetType
}

export type GroupByColumnType = {
    isGroup: boolean,
    column?: FieldDatasetType,
    isDisplayGroupCaptions: boolean
}

export type HorizontalAxisType = {
    gap: GapType,
    floatingComma: number,
    customValues: number[] | undefined,
    position: string,
    isGrid: boolean
}

export type CaptionsType = {
    column?: FieldDatasetType,
    isColumnCaptionsOnSeparateLine: boolean,
    isValueWithinColumns: boolean,
    alignment: ALIGNMENT,
    floatingComma: number,
    swapValueWithCaptions: boolean,
    isDisplayGroupCaptions: boolean
}

export type AxesType = {
    gap: GapType,
    isGrid: boolean,
    isDividingLine: boolean
}

export type BarsViewType = {
    color: string,
    isCustomizeColor: boolean,
    customizeColorFields: {
        fieldId: string,
        color: string
    }[],
    isDisplayLegend: boolean,
    isDividingLine: boolean,
    isColumnBackground: boolean
}

export type RangeColumnType = {
    begin?: FieldDatasetType,
    end?: FieldDatasetType
}

export type RangeCaptionType = {
    column?: FieldDatasetType,
    alignment: ALIGNMENT,
    displayValues: string,
    isDisplayColumnHeaders: boolean
}

export type BarChartConfigType = {
    chosenColumns: FieldDatasetType[],
    groupByColumn: GroupByColumnType,
    captions: CaptionsType,
    sort: SORT_STRING,
    axes: AxesType,
    view: BarsViewType
}
// TODO: переделать типы в интерфейсы и сделать наследуемый интерфейс
export type StackedBarsConfigType  = {
    chosenColumns: FieldDatasetType[],
    groupByColumn: GroupByColumnType,
    captions: CaptionsType,
    sort: SortType,
    axes: AxesType,
    view: BarsViewType
}

export type ScatterPlotConfigType = {
    horizontalAxis: AxesCommonType,
    verticalAxis: AxesCommonType,
    view: {
        common: DotConfigType,
        isConfigIndividually: boolean,
        customizeField: IndividualDotConfigType[],
        isDisplayLegend: boolean
    }
}

export type DotPlotConfigType = {
    captions: {
        column: FieldDatasetType | undefined,
        alignment: ALIGNMENT,
        isDisplayLegend: boolean,
    },
    sort: SortType,
    horizontalAxis: HorizontalAxisType,
    view: {
        dots: IndividualDotConfigType[],
        isDisplayLegend: boolean,
        isConnectDots: boolean
    }
}

export type RangePlotConfigType = {
    columns: RangeColumnType,
    captions: RangeCaptionType,
    sort: SortType,
    groupByColumn: GroupByColumnType,
    horizontalAxis: HorizontalAxisType,
    view: {
        dots: IndividualDotConfigType[],
        gap: OutlineType,
        isDisplayLegend: boolean
    }
}

export type ElectionDonutConfigType = {
    chosenColumns: FieldDatasetType[],
    captions: {
        floatingComma: number
    },
    sort: SORT_STRING_4,
    groups: {
        countSections: number,
        caption: string
    },
    view: {
        fieldId: string,
        color: string
    }[]
}

export type SplitBarsConfigType = {
    chosenColumns: FieldDatasetType[],
    groupByColumn: GroupByColumnType,
    captions:CaptionsType,
    sort: SortType,
    axes: AxesType,
    view: {
        default: BarsViewType,
        mirrorColumn: boolean,
    }
}

export type BulletBarsConfigType = {
    columns: {
        outerColumn?: FieldDatasetType,
        innerColumn?: FieldDatasetType,
    },
    groupByColumn: GroupByColumnType,
    captions: CaptionsType,
    sort: SortType,
    axes: AxesType,
    view: {
        outerColumnColor: string,
        innerColumnColor: string,
        isDisplayLegend: boolean,
        isDisplayColumnBackground: boolean
    }
}

export type ArrowPlotConfigType = {
    columns: RangeColumnType,
    cations: RangeCaptionType,
    sort: SortType,
    groupByColumn: GroupByColumnType,
    horizontalAxis: HorizontalAxisType,
    view: {
        fieldId: string,
        color: string,
        width: number,
        isIncludeLegend: boolean
    }[]
}