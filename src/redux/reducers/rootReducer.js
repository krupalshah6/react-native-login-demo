import {combineReducers} from 'redux';
import authUser from './authReducer';
import basicReducers from './basicReducer';
const rootReducer = combineReducers({
  authUser,
  basicReducers,
});

export default rootReducer;
