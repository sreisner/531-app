import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { AuthProvider } from './context/authContext.component';
import { SnackbarProvider } from './context/snackbarContext.component';
import { LoginModalProvider } from './core/loginModal/loginModalContext.component';
import { SignUpModalProvider } from './core/signUpModal/signUpModalContext.component';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <SnackbarProvider>
        <LoginModalProvider>
          <SignUpModalProvider>
            <App />
          </SignUpModalProvider>
        </LoginModalProvider>
      </SnackbarProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
