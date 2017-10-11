import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import patientSaga from './saga/patients';

const initialState = {};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk, logger, sagaMiddleware];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composedEnhancers);

// then run the saga
sagaMiddleware.run(patientSaga);

export default store;
