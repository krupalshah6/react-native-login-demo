import {postRequest} from '../../network/APIRequest';
import ApiUrls from '../../network/APIUrl';
import {authRequest, authSuccess, authFailure} from './actionCallBack';
export const userLogin = body => {
  return async dispatch => {
    try {
      dispatch(authRequest());
      const result = await postRequest(ApiUrls.LOGIN, body);
      if (result.code === 200 && result.status === true) {
        dispatch(authSuccess(result));
      } else if (result.code === 200 && result.status === false) {
        dispatch(authFailure(result));
      }
      return result;
    } catch (error) {
      dispatch(dispatch(authFailure(error)));
      throw error;
    }
  };
};
