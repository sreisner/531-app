import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { AuthProvider } from './context/authContext.component';
import { SnackbarProvider } from './context/snackbarContext.component';
import { LoginModalProvider } from './core/loginModal/loginModalContext.component';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <SnackbarProvider>
        <LoginModalProvider>
          <App />
        </LoginModalProvider>
      </SnackbarProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
