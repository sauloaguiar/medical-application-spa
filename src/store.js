import { createStore, applyMiddleware, compose } from 'redux'; 
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';

export const history = createHistory();
const initialState = {};
const middleware = [
  thunk,
  routerMiddleware(history)
];

const composedEnhancers = compose(applyMiddleware(...middleware));

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;