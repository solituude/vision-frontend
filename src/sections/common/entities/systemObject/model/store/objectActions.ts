import { CardInfoType } from '../types';
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
  FILTER_BY_COMPANY,
} from './actionTypes';

export const addObject = (object: CardInfoType) => ({
  type: ADD_OBJECT,
  payload: object,
});

export const removeObject = (objectId: number) => ({
  type: REMOVE_OBJECT,
  payload: objectId,
});

export const updateObject = (object: CardInfoType) => ({
  type: UPDATE_OBJECT,
  payload: object,
});

export const toggleFavorite = (objectId: number) => ({
  type: TOGGLE_FAVORITE,
  payload: objectId,
});

export const setSharedStatus = (objectId: number, isShared: boolean) => ({
  type: SET_SHARED_STATUS,
  payload: { objectId, isShared },
});

export const setAccessStatus = (objectId: number, isAccess: boolean) => ({
  type: SET_ACCESS_STATUS,
  payload: { objectId, isAccess },
});

export const searchObjects = (query: string) => ({
  type: SEARCH_OBJECTS,
  payload: query,
});

export const applyFilters = (filters: {
  sortedBy: string;
  objectType: string;
  selectedOwners: string[];
  dateRange: string;
}) => ({
  type: APPLY_FILTERS,
  payload: filters,
});

export const filterByFavorites = () => ({
  type: FILTER_BY_FAVORITES,
});

export const filterByShared = () => ({
  type: FILTER_BY_SHARED,
});

export const filterByPerson = () => ({
  type: FILTER_BY_PERSON,
});

export const filterByCompany = () => ({
  type: FILTER_BY_COMPANY,
})