import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLoginSuccess: () => {},
  onLogout: () => {},
});

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: localStorage.isLoggedIn === 'true',
    };
  }

  onLoginSuccess = () => {
    this.setState({ isLoggedIn: true });
    localStorage.isLoggedIn = 'true';
  };

  onLogout = () => {
    this.setState({ isLoggedIn: false });
    localStorage.isLoggedIn = 'false';
  };

  render() {
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          onLoginSuccess: this.onLoginSuccess,
          onLogout: this.onLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
