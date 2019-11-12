import * as types from './actionTypes';
export const authRequest = () => ({
  type: types.AUTH_REQUEST,
});

export const authSuccess = data => ({
  type: types.AUTH_SUCCESS,
  payload: data,
});

export const authFailure = data => ({
  type: types.AUTH_FAILURE,
  payload: data,
});
