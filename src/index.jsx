import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './index.scss';

import store from './app/centralized-state/store';
import {App} from './app/app';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
