import {ROLES} from "common/entities/staff";

export type UserType = {
    surName: string,
    firstName: string,
    patronymic: string,
    email: string,
    role: ROLES | "",
    // status: STATUSES,
    // date: string
}