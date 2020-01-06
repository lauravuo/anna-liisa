export const BUTTON_PRESSED = 'BUTTON_PRESSED';

export const buttonPress = () => ({
  type: BUTTON_PRESSED
});

export const FETCH_USER = 'FETCH_USER';

export const fetchUser = username => ({ type: FETCH_USER, payload: username });

export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

export const fetchUserFulfilled = payload => ({
  type: FETCH_USER_FULFILLED,
  payload
});

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

export const SET_USER = 'SET_USER';

export const setUser = user => ({ type: SET_USER, payload: user });

export const CREATE_CHALLENGE = 'CREATE_CHALLENGE';

export const createChallenge = (name = 'TODO') => ({
  type: CREATE_CHALLENGE,
  payload: name
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
