import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(rootReducer, applyMiddleware(thunk, logger));
} else {
  store = createStore(rootReducer);
}

const dispatch = action => {
  store.dispatch(action);
};

const getState = () => store.getState();

export {store, getState, dispatch};
