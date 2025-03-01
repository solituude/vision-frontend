import {CardInfoType} from '../types';
import {
    ADD_OBJECT,
    REMOVE_OBJECT,
    UPDATE_OBJECT,
    TOGGLE_FAVORITE,
    SET_SHARED_STATUS,
    SET_ACCESS_STATUS,
    SEARCH_OBJECTS,
    APPLY_FILTERS,
    FILTER_BY_FAVORITES,
    FILTER_BY_SHARED,
    FILTER_BY_PERSON,
    FILTER_BY_COMPANY
} from './actionTypes';

type FiltersType = {
    sortedBy: string;
    objectType: string;
    selectedOwners: string[];
    dateRange: string;
};

type ActionType =
    | { type: typeof ADD_OBJECT; payload: CardInfoType }
    | { type: typeof REMOVE_OBJECT; payload: number }
    | { type: typeof UPDATE_OBJECT; payload: CardInfoType }
    | { type: typeof TOGGLE_FAVORITE; payload: number }
    | { type: typeof SET_SHARED_STATUS; payload: { objectId: number; isShared: boolean } }
    | { type: typeof SET_ACCESS_STATUS; payload: { objectId: number; isAccess: boolean } }
    | { type: typeof SEARCH_OBJECTS; payload: string }
    | { type: typeof APPLY_FILTERS; payload: FiltersType }
    | { type: typeof FILTER_BY_FAVORITES }
    | { type: typeof FILTER_BY_SHARED }
    | { type: typeof FILTER_BY_PERSON }
    | { type: typeof FILTER_BY_COMPANY }

const initialState: { allObjects: CardInfoType[]; filteredObjects: CardInfoType[] } = {
    allObjects: [
        {
            ObjectId: 1,
            ObjectName: "Папка 1",
            ObjectType: "FOLDER",
            ObjectIsFavorites: false,
            ObjectIsShared: false,
            ObjectIsAccess: true,
            ownerName: "Иван Иванов",
            ownerEmail: "ivan.ivanov@example.com",
            ownerCompanyName: "КомпаниНейм",
            dateOfCreating: "15.07.2024",
        },
        {
            ObjectId: 2,
            ObjectName: "Папка 2",
            ObjectType: "FOLDER",
            ObjectIsFavorites: true,
            ObjectIsShared: false,
            ObjectIsAccess: true,
            ownerName: "Мария Петровна",
            ownerEmail: "maria.petrov@example.com",
            ownerCompanyName: "КомпаниНейм",
            dateOfCreating: "15.07.2024",
        },
        {
            ObjectId: 3,
            ObjectName: "Дашборд 1",
            ObjectType: "DASHBOARD",
            ObjectIsFavorites: false,
            ObjectIsShared: false,
            ObjectIsAccess: true,
            ownerName: "Александр Смирнов",
            ownerEmail: "alexander.smirnov@example.com",
            ownerCompanyName: "КомпаниНейм",
            dateOfCreating: "15.07.2024",
        },
        {
            ObjectId: 4,
            ObjectName: "Дашборд 2",
            ObjectType: "DASHBOARD",
            ObjectIsFavorites: false,
            ObjectIsShared: false,
            ObjectIsAccess: true,
            ownerName: "Ольга Кузнецова",
            ownerEmail: "olga.kuznetsova@example.com",
            ownerCompanyName: "КомпаниНейм",
            dateOfCreating: "15.07.2024",
        },
        {
            ObjectId: 5,
            ObjectName: "Папка 3",
            ObjectType: "FOLDER",
            ObjectIsFavorites: true,
            ObjectIsShared: true,
            ObjectIsAccess: true,
            ownerName: "Дмитрий Сидоров",
            ownerEmail: "dmitry.sidorov@example.com",
            ownerCompanyName: "КомпаниНейм1",
            dateOfCreating: "15.07.2024",
        },
        {
            ObjectId: 6,
            ObjectName: "Папка 4",
            ObjectType: "FOLDER",
            ObjectIsFavorites: false,
            ObjectIsShared: false,
            ObjectIsAccess: false,
            ownerName: "Елена Волкова",
            ownerEmail: "elena.volkova@example.com",
            ownerCompanyName: "КомпаниНейм1",
            dateOfCreating: "15.07.2024",
        },
        {
            ObjectId: 7,
            ObjectName: "Папка 5",
            ObjectType: "FOLDER",
            ObjectIsFavorites: false,
            ObjectIsShared: false,
            ObjectIsAccess: true,
            ownerName: "Анатолий Попов",
            ownerEmail: "anatoly.popov@example.com",
            ownerCompanyName: "КомпаниНейм1",
            dateOfCreating: "15.07.2024",
        },
        {
            ObjectId: 8,
            ObjectName: "Папка 6",
            ObjectType: "FOLDER",
            ObjectIsFavorites: false,
            ObjectIsShared: true,
            ObjectIsAccess: true,
            ownerName: "Татьяна Морозова",
            ownerEmail: "tatiana.morozova@example.com",
            ownerCompanyName: "КомпаниНейм1",
            dateOfCreating: "15.07.2024",
        },
    ],
    filteredObjects: []
};

const objectsReducer = (state = {...initialState, filteredObjects: initialState.allObjects}, action: ActionType) => {
    switch (action.type) {
        case ADD_OBJECT:
            return {
                ...state,
                allObjects: [...state.allObjects, action.payload],
                filteredObjects: [...state.filteredObjects, action.payload]
            };

        case REMOVE_OBJECT:
            return {
                ...state,
                allObjects: state.allObjects.filter((object) => object.ObjectId !== action.payload),
                filteredObjects: state.filteredObjects.filter((object) => object.ObjectId !== action.payload),
            };

        case UPDATE_OBJECT:
            console.log("asd")
            return {
                ...state,
                allObjects: state.allObjects.map((object) => (object.ObjectId === action.payload.ObjectId ? {...action.payload} : object)),
                filteredObjects: state.filteredObjects.map((object) => (object.ObjectId === action.payload.ObjectId ? {...action.payload} : object)),
            };

        case TOGGLE_FAVORITE:
            return {
                ...state,
                allObjects: state.allObjects.map((object) =>
                    object.ObjectId === action.payload ? {
                        ...object,
                        ObjectIsFavorites: !object.ObjectIsFavorites
                    } : object
                ),
                filteredObjects: state.filteredObjects.map((object) =>
                    object.ObjectId === action.payload ? {
                        ...object,
                        ObjectIsFavorites: !object.ObjectIsFavorites
                    } : object
                ),
            };

        case SET_SHARED_STATUS:
            return {
                ...state,
                allObjects: state.allObjects.map((object) =>
                    object.ObjectId === action.payload.objectId ? {
                        ...object,
                        ObjectIsShared: action.payload.isShared
                    } : object
                ),
                filteredObjects: state.filteredObjects.map((object) =>
                    object.ObjectId === action.payload.objectId ? {
                        ...object,
                        ObjectIsShared: action.payload.isShared
                    } : object
                ),
            };

        case SET_ACCESS_STATUS:
            return {
                ...state,
                allObjects: state.allObjects.map((object) =>
                    object.ObjectId === action.payload.objectId ? {
                        ...object,
                        ObjectIsAccess: action.payload.isAccess
                    } : object
                ),
                filteredObjects: state.filteredObjects.map((object) =>
                    object.ObjectId === action.payload.objectId ? {
                        ...object,
                        ObjectIsAccess: action.payload.isAccess
                    } : object
                ),
            };

        case SEARCH_OBJECTS:
            const query = action.payload.toLowerCase();
            if (query.trim() === "") {
                return {...state, filteredObjects: state.allObjects};
            }
            return {
                ...state,
                filteredObjects: state.allObjects.filter(
                    (object) =>
                        object.ObjectName.toLowerCase().includes(query) || object.ownerName.toLowerCase().includes(query)
                ),
            };

        case APPLY_FILTERS:
            const {sortedBy, objectType, selectedOwners, dateRange} = action.payload;

            let filteredObjects = [...state.allObjects];

            if (objectType) {
                filteredObjects = filteredObjects.filter(object => object.ObjectType.toLowerCase() === objectType);
            }

            if (selectedOwners.length > 0) {
                filteredObjects = filteredObjects.filter(object => selectedOwners.includes(object.ownerEmail));
            }

            if (dateRange) {
                const now = new Date();
                filteredObjects = filteredObjects.filter(object => {
                    const objectDate = new Date(object.dateOfCreating);
                    switch (dateRange) {
                        case 'today':
                            return objectDate.toDateString() === now.toDateString();
                        case 'last-7-days':
                            return now.getTime() - objectDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
                        case 'last-30-days':
                            return now.getTime() - objectDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
                        case 'this-year':
                            return objectDate.getFullYear() === now.getFullYear();
                        case 'last-year':
                            return objectDate.getFullYear() === now.getFullYear() - 1;
                        default:
                            return true;
                    }
                });
            }

            if (sortedBy === 'alphabetically') {
                filteredObjects.sort((a, b) => a.ObjectName.localeCompare(b.ObjectName));
            } else if (sortedBy === 'non-alphabetically') {
                filteredObjects.sort((a, b) => b.ObjectName.localeCompare(a.ObjectName));
            } else if (sortedBy === 'new-first') {
                filteredObjects.sort((a, b) => new Date(b.dateOfCreating).getTime() - new Date(a.dateOfCreating).getTime());
            } else if (sortedBy === 'old-first') {
                filteredObjects.sort((a, b) => new Date(a.dateOfCreating).getTime() - new Date(b.dateOfCreating).getTime());
            }

            return {...state, filteredObjects};

        case FILTER_BY_FAVORITES:
            return {
                ...state,
                filteredObjects: state.allObjects.filter(object => object.ObjectIsFavorites),
            };

        case FILTER_BY_SHARED:
            return {
                ...state,
                filteredObjects: state.allObjects.filter(object => object.ObjectIsShared),
            };

        case FILTER_BY_PERSON:
            return {
                ...state,
                filteredObjects: state.allObjects.filter(object => !object.ObjectIsShared),
            };

        case FILTER_BY_COMPANY:
            return {
                ...state,
                filteredObjects: state.allObjects.filter(object => object.ownerCompanyName === "КомпаниНейм")
            };


        default:
            return state;
    }
};

export default objectsReducer;
