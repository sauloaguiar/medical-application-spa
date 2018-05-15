import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import indexSaga from './saga/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk, sagaMiddleware, logger];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, {}, composedEnhancers);

// then run the saga
sagaMiddleware.run(indexSaga);

export default store;
