import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  BUTTON_PRESSED,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  SET_USER
} from './actions';
import initialState from './initial-state';

export const button = (state = initialState.button, action) => {
  switch (action.type) {
    case BUTTON_PRESSED:
      return { ...state, pressed: !state.pressed };
    default:
      return state;
  }
};

export const user = (state = initialState.user, action) => {
  switch (action.type) {
    case FETCH_USER_FULFILLED:
      return action.payload;
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export const error = (state = initialState.error, action) => {
  switch (action.type) {
    case FETCH_USER_REJECTED:
      return { description: 'Failed to fetch user.', reason: action.payload };
    default:
      return state;
  }
};

export default history =>
  combineReducers({
    router: connectRouter(history),
    button,
    user,
    error
  });
