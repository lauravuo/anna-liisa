import { challenges as reducer } from './reducers';
import initialState from './initial-state';
import { SET_CHALLENGES } from './actions';

describe('challenges reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.challenges);
  });
  it('should set challenges', () => {
    expect(
      reducer(initialState.challenges, {
        type: SET_CHALLENGES,
        payload: ['id1', 'id2']
      })
    ).toEqual({
      current: {
        id: 'id2',
        data: null,
        books: {}
      },
      all: ['id1', 'id2'],
      loading: true
    });
  });
});
