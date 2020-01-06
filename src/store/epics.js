import { empty, of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { LOCATION_CHANGE } from 'connected-react-router';

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
  SET_MODEL,
  SET_USER,
  SET_CHALLENGES,
  CREATE_CHALLENGE_FULFILLED
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
      !state$.value.challenges.current && state$.value.user
        ? from(
            firebase
              .firestore()
              .collection('challenges')
              .where('owner', '==', state$.value.user.uid)
              .where('model', '==', defaultModel)
              .orderBy('created')
              .get()
          ).pipe(
            map(
              querySnapshot =>
                setChallenges(
                  querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                ),
              catchError(error => of(operationRejected(SET_CHALLENGES, error)))
            )
          )
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
            model: defaultModel,
            participants: [user.uid],
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

export default combineEpics(
  initModelEpic,
  initChallengesEpic,
  fetchUserEpic,
  createChallengeEpic
);
