import { empty, of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, switchMap, catchError, filter } from 'rxjs/operators';
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
  SELECT_INDEX,
  ADD_BOOK,
  addBookFulfilled,
  joinChallengeFulfilled,
  JOIN_CHALLENGE_FULFILLED,
  JOIN_CHALLENGE,
  joinChallengeParticipantsFulfilled,
  JOIN_CHALLENGE_PARTICIPANTS_FULFILLED
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
    ofType(SET_USER, JOIN_CHALLENGE_FULFILLED),
    switchMap(() =>
      !state$.value.challenges.current.id && state$.value.user
        ? from(
            firebase
              .firestore()
              .doc(`users/${state$.value.user.uid}`)
              .get()
          ).pipe(
            map(q => setChallenges(q.data() ? q.data().challenges : [])),
            catchError(error => of(operationRejected(SET_CHALLENGES, error)))
          )
        : empty()
    )
  );

const fetchChallengeEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_CHALLENGES, JOIN_CHALLENGE_FULFILLED),
    mergeMap(() => {
      const currentId = state$.value.challenges.current.id;
      return currentId
        ? from(
            firebase
              .firestore()
              .collection('challenges')
              .doc(currentId)
              .get()
          ).pipe(
            mergeMap(challengeQuery => {
              const challenge = challengeQuery.data();
              return from(
                firebase
                  .firestore()
                  .collection('challenges')
                  .doc(currentId)
                  .collection('users')
                  .get()
              ).pipe(
                map(usersQuery => {
                  const users = usersQuery.docs
                    .map(doc => ({ ...doc.data(), id: doc.id }))
                    .reduce(
                      (result, item) => ({ ...result, [item.id]: item }),
                      {}
                    );
                  return setCurrentChallenge({ ...challenge, users });
                })
              );
            }),
            catchError(error =>
              of(operationRejected(SET_CURRENT_CHALLENGE, error))
            )
          )
        : empty();
    })
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

const joinChallengeParticipantsEpic = (action$, state$) =>
  action$.pipe(
    ofType(JOIN_CHALLENGE),
    filter(action => !state$.value.challenges.all.includes(action.payload)),
    mergeMap(action => {
      return from(
        firebase
          .firestore()
          .collection('challenges')
          .doc(action.payload)
          .get()
      );
    }),
    mergeMap(doc => {
      const user = firebase.auth().currentUser;
      const data = doc.data();
      return from(
        firebase
          .firestore()
          .collection('challenges')
          .doc(doc.id)
          .set(
            {
              participants: [...data.participants, user.uid]
            },
            { merge: true }
          )
      ).pipe(map(() => joinChallengeParticipantsFulfilled(doc.id)));
    }),
    catchError(error => of(operationRejected(JOIN_CHALLENGE, error)))
  );

const joinChallengeEpic = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_CHALLENGE_FULFILLED, JOIN_CHALLENGE_PARTICIPANTS_FULFILLED),
    mergeMap(action => {
      const user = firebase.auth().currentUser;
      return from(
        firebase
          .firestore()
          .collection('challenges')
          .doc(action.payload)
          .collection('users')
          .doc(user.uid)
          .set({
            name: user.displayName,
            thumbnail: user.photoURL,
            books: []
          })
      ).pipe(
        mergeMap(() => {
          const id = action.payload;
          const challengeIds = [
            ...state$.value.challenges.all.map(challenge => challenge.id),
            id
          ];
          return from(
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set(
                {
                  challenges: challengeIds
                },
                { merge: true }
              )
          );
        }),
        map(() => joinChallengeFulfilled(action.payload))
      );
    }),
    catchError(error => of(operationRejected(JOIN_CHALLENGE, error)))
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
            name: action.payload
          })
      );
    }),
    map(response => createChallengeFulfilled(response.id)),
    catchError(error => of(operationRejected(CREATE_CHALLENGE, error)))
  );

const selectIndexEpic = (action$, state$) =>
  action$.pipe(
    ofType(SELECT_INDEX),
    map(action =>
      push(`/${state$.value.challenges.current.id}/${action.payload}`)
    )
  );

const addBookEpic = (action$, state$) =>
  action$.pipe(
    ofType(ADD_BOOK),
    mergeMap(action => {
      const user = firebase.auth().currentUser;
      const challengeId = state$.value.challenges.current.id;
      const userData = state$.value.challenges.current.data.users[user.uid];
      const book = {
        ...action.payload,
        created: new Date()
      };
      return from(
        firebase
          .firestore()
          .collection('challenges')
          .doc(challengeId)
          .collection('users')
          .doc(user.uid)
          .set({
            ...userData,
            books: [...userData.books, book]
          })
      ).pipe(map(() => addBookFulfilled({ user, book })));
    }),
    catchError(error => of(operationRejected(ADD_BOOK, error)))
  );

export default combineEpics(
  initModelEpic,
  initChallengesEpic,
  fetchUserEpic,
  joinChallengeEpic,
  joinChallengeParticipantsEpic,
  createChallengeEpic,
  fetchChallengeEpic,
  selectIndexEpic,
  addBookEpic
);
