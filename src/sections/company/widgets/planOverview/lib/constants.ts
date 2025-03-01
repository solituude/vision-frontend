import {PlansInfoType} from "./types";

export const PLANS_INFO: PlansInfoType[] = [
    {
        id: 1,
        name: "Пробный",
        pricePerMonth: null,
        pricePerMonthSale: null,
        labelFeatures: "Возможности: ",
        features: [{label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}]
    },
    {
        id: 2,
        name: "Базовый",
        pricePerMonth: 700,
        pricePerMonthSale: 600,
        labelFeatures: "Возможности: ",
        features: [{label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}, {label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}]
    },
    {
        id: 3,
        name: "Премиум",
        pricePerMonth: 1500,
        pricePerMonthSale: 1300,
        labelFeatures: "Возможности базового + ",
        features: [{label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}, {label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}, {label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}]
    },
    {
        id: 4,
        name: "Премиум+",
        pricePerMonth: 5000,
        pricePerMonthSale: 4500,
        labelFeatures: "Возможности премиума + ",
        features: [{label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}, {label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}, {label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}, {label: "Группа пунктов", list: ["Пункт 1", "Пункт 2"]}]
    },

];
export const FREE_PLAN = "Trial";