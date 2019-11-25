import * as types from './actionTypes';

export const getAvatar = data => ({
  type: types.GET_AVATAR,
  payload: data,
});
export const getRegion = data => ({
  type: types.GET_REGION,
  payload: data,
});
export const setCurrentRegion = data => ({
  type: types.SET_CURRENT_REGION,
  payload: data,
});
