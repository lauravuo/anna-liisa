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
