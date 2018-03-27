import { expect } from '../test_helper';
import { ADD_COMMENT } from '../../src/actions/types';
import { addComment } from '../../src/actions';

describe(
    'Test actions',
    () => {
        describe(
            'test addComment',
            () => {
                let result;
                beforeEach(
                    () => {
                        result = addComment('my comment');
                    }
                );
                it(
                    'has the correct type',
                    () => {
                        expect(result.type).to.equal(ADD_COMMENT);
                    }
                );
                it(
                    'has the correct payload',
                    () => {
                        expect(result.comment).to.equal('my comment');
                    }
                );
            }
        );
    }
);
