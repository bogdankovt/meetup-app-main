import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupApiInterceptors } from './apiInterseptors';
import api from './api';

setupApiInterceptors(api, store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
