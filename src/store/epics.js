import { empty, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  FETCH_USER,
  fetchUser,
  fetchUserFulfilled,
  fetchUserRejected
} from './actions';

const isPageFirstLoad = (
  {
    payload: {
      location: { pathname }
    }
  },
  state
) => pathname === '/page' && !state.user;

const initUserFetchEpic = (action$, state$) =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    switchMap(action =>
      isPageFirstLoad(action, state$.value)
        ? of(fetchUser('lauravuo'))
        : empty()
    )
  );

const fetchUserEpic = action$ =>
  action$.pipe(
    ofType(FETCH_USER),
    mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
        map(response => fetchUserFulfilled(response)),
        catchError(error => of(fetchUserRejected(error.xhr.response)))
      )
    )
  );

export default combineEpics(initUserFetchEpic, fetchUserEpic);
