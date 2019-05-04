// globals localStorage
import axios from 'axios';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FEATURE_RETURNED
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signUser(
    {
        email,
        password,
        adverb,
        history
    }
) {
    return function(dispatch) {
        const message = 'Please check your sign' + adverb + ' info.';
        // Submit email/password to server
        // { email: email, password: password }
        axios.post(
            `${ROOT_URL}/sign${adverb}`,
            {
                email,
                password
            }
        )
        .then( // if server response is successful, i.e., 200
            response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch(
                    {
                        type: AUTH_USER
                    }
                );
                // - Save JWT token
                localStorage.setItem('token', response.data.token);
                // - Redirect to the route '/feature'
                history.push('/feature');
            }
        )
        .catch(() => {
            // If request is bad...
            // - Show an error to the user
            dispatch(
                authError(message)
            );
        });
    };
}

export function signoutUser(history) {
    return function(dispatch) {
        localStorage.removeItem('token');
        dispatch({ type: UNAUTH_USER });
        history.push('/signin');
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(
            ROOT_URL,
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
        ).then(
            ({data}) => {
                dispatch(
                    {
                        type: FEATURE_RETURNED,
                        payload: data.message
                    }
                );
            }
        );
    };
}

