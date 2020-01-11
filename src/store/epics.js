import { empty, of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { push } from 'connected-react-router';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {
  FETCH_USER,
  fetchUser,
  fetchUserFulfilled,
  fetchUserRejected,
  CREATE_CHALLENGE,
  createChallengeFulfilled,
  operationRejected,
  setModel,
  setChallenges,
  setCurrentChallenge,
  SET_MODEL,
  SET_USER,
  SET_CHALLENGES,
  SET_CURRENT_CHALLENGE,
  CREATE_CHALLENGE_FULFILLED,
  SELECT_INDEX
} from './actions';

const defaultModel = CONFIG.modelId;

const initModelEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_USER),
    switchMap(() =>
      !state$.value.model && state$.value.user
        ? from(
            firebase
              .firestore()
              .collection('challengeModels')
              .doc(defaultModel)
              .get()
          ).pipe(
            map(
              model => setModel(model.data()),
              catchError(error => of(operationRejected(SET_MODEL, error)))
            )
          )
        : empty()
    )
  );

const initChallengesEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_USER, CREATE_CHALLENGE_FULFILLED),
    switchMap(() =>
      !state$.value.challenges.current.id && state$.value.user
        ? from(
            firebase
              .firestore()
              .doc(`users/${state$.value.user.uid}`)
              .get()
          ).pipe(
            map(q => setChallenges(q.data().challenges)),
            catchError(error => of(operationRejected(SET_CHALLENGES, error)))
          )
        : empty()
    )
  );

const fetchChallengeEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_CHALLENGES),
    mergeMap(() =>
      from(
        firebase
          .firestore()
          .collection('challenges')
          .doc(state$.value.challenges.current.id)
          .get()
      ).pipe(
        map(q => setCurrentChallenge(q.data())),
        catchError(error => of(operationRejected(SET_CURRENT_CHALLENGE, error)))
      )
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

const createChallengeEpic = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_CHALLENGE),
    mergeMap(action => {
      const user = firebase.auth().currentUser;
      return from(
        firebase
          .firestore()
          .collection('challenges')
          .add({
            created: new Date(),
            owner: user.uid,
            model: {
              id: defaultModel,
              entries: state$.value.model
            },
            participants: [user.uid],
            users: {
              [user.uid]: {
                name: user.displayName,
                thumbnail: user.photoURL,
                books: []
              }
            },
            name: action.payload
          })
      );
    }),
    mergeMap(response => {
      const user = firebase.auth().currentUser;
      return from(
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .set(
            {
              challenges: [
                ...state$.value.challenges.all.map(challenge => challenge.id),
                response.id
              ]
            },
            { merge: true }
          )
      ).pipe(map(() => createChallengeFulfilled(response.id)));
    }),

    catchError(error => of(operationRejected(CREATE_CHALLENGE, error)))
  );

const selectIndexEpic = (action$, state$) =>
  action$.pipe(
    ofType(SELECT_INDEX),
    map(action =>
      push(`/${state$.value.challenges.current.id}/${action.payload}`)
    )
  );

export default combineEpics(
  initModelEpic,
  initChallengesEpic,
  fetchUserEpic,
  createChallengeEpic,
  fetchChallengeEpic,
  selectIndexEpic
);
