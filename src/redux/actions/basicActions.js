import * as types from './actionTypes';

export const getAvatar = (data) => ({
  type: types.GET_AVATAR,
  payload: data,
});
