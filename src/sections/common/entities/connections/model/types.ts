import {IUser} from "common/entities/staff";

// TODO: сделать необязательные поля обязательными

export type ConnectionType = {
    id: string,
    name: string,
    img: string,
    spaceName?: string,
    owner?: IUser,
    date?: string
}

export type ConnectionsStateType = {
    connections: ConnectionType[],
    isFetching: boolean
}

export type SortType = "new-first" | "old-first" | "alphabetically" | "non-alphabetically";