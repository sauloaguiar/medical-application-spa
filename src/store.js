import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk, logger];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
