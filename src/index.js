import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// see https://reacttraining.com/react-router/web/api/BrowserRouter
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
import App from './components/App';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
// import registerServiceWorker from './registerServiceWorker';
import reduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
    reducers,
    // for Redux Dev Tools Chrome extension to work:
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem('token');

if (token) {
    // we need to update application state
    store.dispatch({
        type: AUTH_USER
    });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
);
// registerServiceWorker();
