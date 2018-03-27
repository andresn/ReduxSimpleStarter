import { ADD_COMMENT } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_COMMENT:
            const trimmedComment = action.comment.trim();
            if (trimmedComment !== '') {
                return [...state, trimmedComment];
            } else {
                return state;
            }
        default:
            return state;
    }

};
