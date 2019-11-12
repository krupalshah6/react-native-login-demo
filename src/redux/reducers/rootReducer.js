import {combineReducers} from 'redux';
import authUser from './authReducer';

const rootReducer = combineReducers({
  authUser,
});

export default rootReducer;
