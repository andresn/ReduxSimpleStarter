import {
    FETCH_USERS
} from '../actions/types';

export default function(state = [], action) {

    console.log('action.type:');
    console.log(action.type);
    console.log('');
    
    switch (action.type) {
        case FETCH_USERS:
            return [ ...state, ...action.payload.data];
    }

    return state;
}
