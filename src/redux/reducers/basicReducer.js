import * as types from '../actions/actionTypes';

const initialState = {
  avatar: [],
};

const basicReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    default:
      return state;
  }
};

export default basicReducers;
