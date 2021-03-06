import * as types from './actionTypes';
import * as dwarvesApi from '../../api/dwarvesApi';
import {beginApiCall, apiCallError} from './apiStatusActions';
import {getDefaultFilterParameters} from '../../utils';

export function loadDwarvesSuccess(dwarves) {
  return {type: types.LOAD_DWARVES_SUCCESS, dwarves};
}

export function searchDwarvesByName(name) {
  return {type: types.SEARCH_DWARVES_BY_NAME, name};
}

export function saveSearchedName(name) {
  return {type: types.SAVE_SEARCHED_NAME, name};
}

export function filterDwarvesByParams(params) {
  return {type: types.FILTER_DWARVES, params};
}

export function saveFilterParameters(params) {
  return {type: types.SAVE_FILTER_PARAMETERS, params};
}

export function saveDefaultFilterParameters(params) {
  return {type: types.SAVE_DEFAULT_FILTER_PARAMETERS, params};
}

export function toggleFilter(toggle) {
  if (toggle) return {type: types.TOGGLE_FILTER, toggle};
  else return {type: types.TOGGLE_FILTER, toggle};
}

export function copyDwarves(dwarves) {
  return {type: types.COPY_DWARVES, dwarves};
}

export function loadDwarves() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return dwarvesApi
      .getDwarves()
      .then((dwarves) => {
        dispatch(loadDwarvesSuccess(dwarves.Brastlewark));
        dispatch(copyDwarves(dwarves.Brastlewark));
        dispatch(
          saveDefaultFilterParameters(
            getDefaultFilterParameters(dwarves.Brastlewark),
          ),
        );
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function searchDwarves(name, reset, search) {
  return function (dispatch, getState) {
    if (reset) {
      dispatch(copyDwarves(getState().dwarves));
      dispatch(saveSearchedName(''));
    }
    if (getState().isFilterOn) {
      dispatch(filterDwarvesByParams(getState().filterParameters));
    }
    if (search) {
      dispatch(saveSearchedName(name));
      dispatch(searchDwarvesByName(name));
    }
  };
}

export function filterDwarves(params) {
  return function (dispatch, getState) {
    if (getState().isFilterOn) {
      dispatch(toggleFilter(!getState().isFilterOn));
      if (getState().searchedName !== '') {
        dispatch(copyDwarves(getState().dwarves));
        dispatch(searchDwarvesByName(getState().searchedName));
      } else {
        dispatch(copyDwarves(getState().dwarves));
      }
    } else {
      dispatch(toggleFilter(!getState().isFilterOn));
      dispatch(filterDwarvesByParams(params));
    }
    dispatch(saveFilterParameters(params));
  };
}
