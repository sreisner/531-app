import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthConsumer } from './context/authContext.context';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <AuthConsumer>
        {({ onLogout }) => <App onLogout={onLogout} />}
      </AuthConsumer>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
