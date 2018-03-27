import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments';
import { ADD_COMMENT } from '../../src/actions/types';

describe(
    'Comments Reducer', () => {
        // NOTE: always test default of reducer (no relevant type can pass cleanly through it)
        it(
            'handles action with unknown type',
            () => {
                const actual = commentReducer(undefined, {});
                expect(actual).to.be.empty.array;
            }
        );
        it(
            'handles action of type ' + ADD_COMMENT,
            () => {
                const actual = commentReducer(
                    [],
                    {
                        type: ADD_COMMENT,
                        comment: 'My Comment'
                    }
                );
                // .eql is a deep equal (compares arrays, objects)
                expect(actual).to.eql([ 'My Comment' ]);
            }
        );
    }
);
