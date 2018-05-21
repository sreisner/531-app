import React from 'react';
import { LoginService } from '../services/api/login/login.service';
import { UsersService } from '../services/api/users/users.service';

const AuthContext = React.createContext({
  loading: true,
  user: undefined,
  login: () => {},
  logout: () => {},
});

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: undefined,
    };
  }

  componentDidMount() {
    UsersService.getCurrentUser().then(user => {
      this.setState({
        user: user._id ? user : undefined,
        loading: false,
      });
    });
  }

  login = (email, password) => {
    this.setState({ loading: true });

    return LoginService.login(email, password).then(user => {
      this.setState({ user, loading: false });
    });
  };

  logout = () => {
    this.setState({ loading: true });

    return LoginService.logout().then(() => {
      this.setState({ user: undefined, loading: false });
    });
  };

  render() {
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{
          loading: this.state.loading,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
