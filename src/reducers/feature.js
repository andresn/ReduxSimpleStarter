import {
    FEATURE_RETURNED
} from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case FEATURE_RETURNED:
            return { ...state, feature: action.payload };
    }
    return state;
}
