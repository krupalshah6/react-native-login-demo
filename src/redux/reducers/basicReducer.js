import * as types from '../actions/actionTypes';

const initialState = {
  avatar: [],
  region: [],
  defaultRegion: {},
  feesType: [],
  filterData: {},
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
    case types.GET_FEES_TYPE:
      return {
        ...state,
        feesType: action.payload,
      };
    case types.SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      return state;
  }
};

export default basicReducers;
