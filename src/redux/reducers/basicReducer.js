import * as types from '../actions/actionTypes';

const initialState = {
  avatar: [],
  region: [],
  defaultRegion: {},
};

const basicReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    case types.GET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case types.SET_CURRENT_REGION:
      return {
        ...state,
        defaultRegion: action.payload,
      };
    default:
      return state;
  }
};

export default basicReducers;
