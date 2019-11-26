import * as types from '../actions/actionTypes';

const initialState = {
    micData: [],
  };

  const micReducers = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_MIC_DATA:
        return {
          ...state,
          micData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default micReducers;