import { of, from } from 'rxjs';
import { map, mergeMap, switchMap, catchError, filter } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { push } from 'connected-react-router';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {
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
  JOIN_CHALLENGE_PARTICIPANTS_FULFILLED,
  EDIT_BOOK,
  editBookFulfilled,
  DELETE_BOOK,
  deleteBookFulfilled
} from './actions';

const getFirebaseDoc = (collectionName, docId) =>
  from(
    firebase
      .firestore()
      .collection(collectionName)
      .doc(docId)
      .get()
  );

const setFirebaseDoc = (collectionName, docId, data) =>
  from(
    firebase
      .firestore()
      .collection(collectionName)
      .doc(docId)
      .set(data, { merge: true })
  );

const setUserData = (challengeId, userId, data) =>
  from(
    firebase
      .firestore()
      .collection('challenges')
      .doc(challengeId)
      .collection('users')
      .doc(userId)
      .set(data, { merge: true })
  );

const defaultModel = CONFIG.modelId;

const initModelEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_USER),
    filter(() => !state$.value.model && state$.value.user),
    switchMap(() => getFirebaseDoc('challengeModels', defaultModel)),
    map(model => setModel(model.data())),
    catchError(error => of(operationRejected(SET_MODEL, error)))
  );

const initChallengesEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_USER, JOIN_CHALLENGE_FULFILLED),
    filter(() => !state$.value.challenges.current.id && state$.value.user),
    switchMap(() => getFirebaseDoc('users', state$.value.user.uid)),
    map(q => setChallenges(q.data() ? q.data().challenges : [])),
    catchError(error => of(operationRejected(SET_CHALLENGES, error)))
  );

const fetchChallengeEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_CHALLENGES, JOIN_CHALLENGE_FULFILLED),
    filter(() => state$.value.challenges.current.id),
    mergeMap(() => {
      const currentId = state$.value.challenges.current.id;
      return getFirebaseDoc('challenges', currentId).pipe(
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
                .reduce((result, item) => ({ ...result, [item.id]: item }), {});
              return setCurrentChallenge({ ...challenge, users });
            })
          );
        }),
        catchError(error => of(operationRejected(SET_CURRENT_CHALLENGE, error)))
      );
    })
  );

const joinChallengeParticipantsEpic = (action$, state$) =>
  action$.pipe(
    ofType(JOIN_CHALLENGE),
    filter(action => !state$.value.challenges.all.includes(action.payload)),
    mergeMap(action => getFirebaseDoc('challenges', action.payload)),
    mergeMap(doc => {
      const user = firebase.auth().currentUser;
      const data = doc.data();
      return setFirebaseDoc('challenges', doc.id, {
        participants: [...data.participants, user.uid]
      }).pipe(map(() => joinChallengeParticipantsFulfilled(doc.id)));
    }),
    catchError(error => of(operationRejected(JOIN_CHALLENGE, error)))
  );

const joinChallengeEpic = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_CHALLENGE_FULFILLED, JOIN_CHALLENGE_PARTICIPANTS_FULFILLED),
    mergeMap(action => {
      const user = firebase.auth().currentUser;
      const currentId = state$.value.challenges.current.id;
      return setUserData(currentId, user.uid, {
        name: user.displayName,
        thumbnail: user.photoURL,
        books: []
      }).pipe(
        mergeMap(() => {
          const id = action.payload;
          const challengeIds = [
            ...state$.value.challenges.all.map(challenge => challenge.id),
            id
          ];
          return setFirebaseDoc('users', user.uid, {
            challenges: challengeIds
          });
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
      return setUserData(challengeId, user.uid, {
        books: [...userData.books, book]
      }).pipe(map(() => addBookFulfilled({ user, book })));
    }),
    catchError(error => of(operationRejected(ADD_BOOK, error)))
  );

const editBookEpic = (action$, state$) =>
  action$.pipe(
    ofType(EDIT_BOOK),
    mergeMap(action => {
      const user = firebase.auth().currentUser;
      const challengeId = state$.value.challenges.current.id;
      const userData = state$.value.challenges.current.data.users[user.uid];
      const book = {
        ...userData.books.find(item => item.created === action.payload.created),
        ...action.payload
      };
      const newBooks = [
        ...userData.books.filter(
          item => item.created !== action.payload.created
        ),
        book
      ];
      return setUserData(challengeId, user.uid, {
        books: newBooks
      }).pipe(map(() => editBookFulfilled({ user, book })));
    }),
    catchError(error => of(operationRejected(EDIT_BOOK, error)))
  );

const deleteBookEpic = (action$, state$) =>
  action$.pipe(
    ofType(DELETE_BOOK),
    mergeMap(action => {
      const user = firebase.auth().currentUser;
      const challengeId = state$.value.challenges.current.id;
      const userData = state$.value.challenges.current.data.users[user.uid];
      const newBooks = userData.books.filter(
        item => item.created !== action.payload
      );
      return setUserData(challengeId, user.uid, {
        books: newBooks
      }).pipe(map(() => deleteBookFulfilled({ user, books: newBooks })));
    }),
    catchError(error => of(operationRejected(DELETE_BOOK, error)))
  );

export default combineEpics(
  initModelEpic,
  initChallengesEpic,
  joinChallengeEpic,
  joinChallengeParticipantsEpic,
  createChallengeEpic,
  fetchChallengeEpic,
  selectIndexEpic,
  addBookEpic,
  editBookEpic,
  deleteBookEpic
);
