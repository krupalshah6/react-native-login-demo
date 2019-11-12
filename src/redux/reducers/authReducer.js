import * as types from '../actions/actionTypes';
const initialState = {
  userLoginData: '',
};

const authUser = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: undefined,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    case types.AUTH_FAILURE:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    default:
      return state;
  }
};

export default authUser;
