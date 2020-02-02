export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';

export const fetchUserRejected = payload => ({
  type: FETCH_USER_REJECTED,
  error: true,
  payload
});

export const SET_MODEL = 'SET_MODEL';

export const setModel = model => ({ type: SET_MODEL, payload: model });

export const SET_CHALLENGES = 'SET_CHALLENGES';

export const setChallenges = challenges => ({
  type: SET_CHALLENGES,
  payload: challenges
});

export const SET_CURRENT_CHALLENGE = 'SET_CURRENT_CHALLENGE';

export const setCurrentChallenge = challenge => ({
  type: SET_CURRENT_CHALLENGE,
  payload: challenge
});

export const SET_USER = 'SET_USER';

export const setUser = user => ({ type: SET_USER, payload: user });

export const CREATE_CHALLENGE = 'CREATE_CHALLENGE';

export const createChallenge = (name = 'TODO') => ({
  type: CREATE_CHALLENGE,
  payload: name
});

export const JOIN_CHALLENGE = 'JOIN_CHALLENGE';

export const joinChallenge = code => ({
  type: JOIN_CHALLENGE,
  payload: code
});

export const JOIN_CHALLENGE_PARTICIPANTS_FULFILLED =
  'JOIN_CHALLENGE_PARTICIPANTS_FULFILLED';

export const joinChallengeParticipantsFulfilled = payload => ({
  type: JOIN_CHALLENGE_PARTICIPANTS_FULFILLED,
  payload
});

export const CREATE_CHALLENGE_FULFILLED = 'CREATE_CHALLENGE_FULFILLED';

export const createChallengeFulfilled = payload => ({
  type: CREATE_CHALLENGE_FULFILLED,
  payload
});

export const OPERATION_REJECTED = 'OPERATION_REJECTED';

export const operationRejected = (actionType, payload) => ({
  type: OPERATION_REJECTED,
  error: true,
  actionType,
  payload
});

export const SELECT_INDEX = 'SELECT_INDEX';

export const selectIndex = payload => ({
  type: SELECT_INDEX,
  payload
});

export const ADD_BOOK = 'ADD_BOOK';

export const addBook = payload => ({
  type: ADD_BOOK,
  payload
});

export const ADD_BOOK_FULFILLED = 'ADD_BOOK_FULFILLED';

export const addBookFulfilled = payload => ({
  type: ADD_BOOK_FULFILLED,
  payload
});

export const EDIT_BOOK = 'EDIT_BOOK';

export const editBook = payload => ({
  type: EDIT_BOOK,
  payload
});

export const EDIT_BOOK_FULFILLED = 'EDIT_BOOK_FULFILLED';

export const editBookFulfilled = payload => ({
  type: EDIT_BOOK_FULFILLED,
  payload
});

export const DELETE_BOOK = 'DELETE_BOOK';

export const deleteBook = payload => ({
  type: DELETE_BOOK,
  payload
});

export const DELETE_BOOK_FULFILLED = 'DELETE_BOOK_FULFILLED';

export const deleteBookFulfilled = payload => ({
  type: DELETE_BOOK_FULFILLED,
  payload
});

export const JOIN_CHALLENGE_FULFILLED = 'JOIN_CHALLENGE_FULFILLED';

export const joinChallengeFulfilled = payload => ({
  type: JOIN_CHALLENGE_FULFILLED,
  payload
});
