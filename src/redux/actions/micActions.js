import * as types from './actionTypes';

export const setMicData = data => ({
  type: types.SET_MIC_DATA,
  payload: data,
});