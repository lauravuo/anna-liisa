import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  BUTTON_PRESSED,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  SET_USER,
  CREATE_CHALLENGE_FULFILLED,
  SET_MODEL,
  SET_CHALLENGES,
  SET_CURRENT_CHALLENGE,
  JOIN_CHALLENGE_FULFILLED,
  ADD_BOOK_FULFILLED,
  EDIT_BOOK_FULFILLED,
  DELETE_BOOK_FULFILLED
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

const getBooks = data => {
  return data
    ? Object.keys(data.users)
        .reduce((result, item) => {
          const user = data.users[item];
          const userData = {
            id: user.id,
            displayName: user.name,
            photoURL: user.thumbnail
          };
          return [
            ...result,
            ...user.books.map(book => ({ user: userData, ...book }))
          ];
        }, [])
        .reduce((result, item) => {
          return {
            ...result,
            [item.index]: [...(result[item.index] || []), item]
          };
        }, {})
    : {};
};

export const challenges = (state = initialState.challenges, action) => {
  switch (action.type) {
    case SET_CHALLENGES: {
      const count = action.payload ? action.payload.length : 0;
      return {
        current: {
          id: count > 0 ? action.payload[count - 1] : null,
          data: null,
          books: getBooks(null)
        },
        all: action.payload,
        loading: action.payload.length > 0
      };
    }
    case SET_CURRENT_CHALLENGE: {
      return {
        ...state,
        current: {
          ...state.current,
          data: action.payload,
          books: getBooks(action.payload),
          loading: false
        }
      };
    }
    case JOIN_CHALLENGE_FULFILLED: {
      return {
        ...state,
        current: {
          ...state.current,
          id: action.payload
        },
        all: [
          ...state.all.filter(item => item !== action.payload),
          action.payload
        ]
      };
    }
    case ADD_BOOK_FULFILLED: {
      const userId = action.payload.user.uid;
      const userData = state.current.data.users[userId];
      const newData = {
        ...state.current.data,
        users: {
          ...state.current.data.users,
          [userId]: {
            ...userData,
            books: [
              ...userData.books,
              {
                ...action.payload.book,
                created: {
                  seconds: action.payload.book.created.getTime() / 1000
                }
              }
            ]
          }
        }
      };
      return {
        ...state,
        current: {
          ...state.current,
          data: newData,
          books: getBooks(newData)
        }
      };
    }
    case EDIT_BOOK_FULFILLED: {
      const userId = action.payload.user.uid;
      const userData = state.current.data.users[userId];
      const newData = {
        ...state.current.data,
        users: {
          ...state.current.data.users,
          [userId]: {
            ...userData,
            books: [
              ...userData.books.filter(
                item => item.created !== action.payload.book.created
              ),
              {
                ...action.payload.book
              }
            ]
          }
        }
      };
      return {
        ...state,
        current: {
          ...state.current,
          data: newData,
          books: getBooks(newData)
        }
      };
    }
    case DELETE_BOOK_FULFILLED: {
      const userId = action.payload.user.uid;
      const userData = state.current.data.users[userId];
      const newData = {
        ...state.current.data,
        users: {
          ...state.current.data.users,
          [userId]: {
            ...userData,
            books: action.payload.books
          }
        }
      };
      return {
        ...state,
        current: {
          ...state.current,
          data: newData,
          books: getBooks(newData)
        }
      };
    }
    default:
      return state;
  }
};

export const model = (state = initialState.model, action) => {
  switch (action.type) {
    case SET_MODEL:
      return Object.keys(action.payload).reduce(
        (result, item) => [
          ...result,
          { nbr: item, name: action.payload[item] }
        ],
        []
      );
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
    challenges,
    model,
    error
  });
