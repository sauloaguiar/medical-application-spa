import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  routing: routerReducer
});

// user
// patients
// prescriptions

/*
* action, reducer, selector, saga, 
* create a action -> reducer (changes data) ->  
* ... saga listening to an action (async) -> action -> reducer ... -> selector (get this data)
*
* io/http: js fetch api
*
* test: fire actions / pre defined state -> check was modified correctly?
*
* react component -> enzyme .. setState async ... 
*/
