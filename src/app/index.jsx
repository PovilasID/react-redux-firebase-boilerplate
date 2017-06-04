import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { Router, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import routes from './routes';

import 'bootstrap-social';

// for bundling your styles
import './bundle.scss';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    	<MuiThemeProvider>
        	<Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
    </Provider>
  , document.querySelector('.react-root'));
