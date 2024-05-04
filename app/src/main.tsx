import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { initMSW } from '../tests/msw/browser';
import { RoutesApp } from './router/RoutesApp.tsx';
import { store } from './store/index.ts';
import './index.css';

// eslint-disable-next-line turbo/no-undeclared-env-vars
if (import.meta.env.DEV) {
  await initMSW();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RoutesApp />
    </React.StrictMode>
  </Provider>,
);
