export enum ROLES {
    CONTRACTOR = "Контрагент",
    USER = "Пользователь",
    ADMIN = "Администратор"
}

export enum  STATUSES {
    "ACTIVE" = "Активный",
    "FROZEN" = "В отпуске",
    "BLOCKED" = "Заблокирован"
}


// TODO: id should be string type
export interface IUser {
    id: number,
    surName: string,
    firstName: string,
    patronymic: string,
    email: string,
    role: ROLES | "",
    status: STATUSES,
    createdDate: string
}

// export const STAFF: IUser[] = [
//     {id: 1, name: "Иван", email: "ivan@ivan.ru", role: ROLES.USER, status: STATUSES.ACTIVE, date: "01.01.2023"},
//     {id: 2, name: "Олег", email: "ivan@ivan.ru", role: ROLES.ADMIN, status: STATUSES.ACTIVE, date: "02.01.2023"},
//     {id: 3, name: "Владимир", email: "ivan@ivan.ru", role: ROLES.USER, status: STATUSES.BLOCKED, date: "05.01.2023"},
//     {id: 4, name: "Ольга", email: "ivan@ivan.ru", role: ROLES.CONTRACTOR, status: STATUSES.ACTIVE, date: "07.01.2023"},
//     {id: 5, name: "Иван2", email: "ivan@ivan.ru", role: ROLES.USER, status: STATUSES.FROZEN, date: "09.01.2023"},
// ]