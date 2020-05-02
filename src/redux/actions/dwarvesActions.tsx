import * as types from './actionTypes';
import * as dwarvesApi from '../../api/dwarvesApi';
import {beginApiCall, apiCallError} from './apiStatusActions';

export function loadDwarvesSuccess(dwarves) {
  return {type: types.LOAD_DWARVES_SUCCESS, dwarves};
}

export function searchDwarvesByName(name) {
  return {type: types.SEARCH_DWARVES_BY_NAME, name};
}

export function loadDwarves() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return dwarvesApi
      .getDwarves()
      .then((authors) => {
        dispatch(loadDwarvesSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function searchByName(name) {
  return function (dispatch) {
    dispatch(searchDwarvesByName(name));
  };
}