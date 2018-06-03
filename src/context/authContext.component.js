import React from 'react';
import LoginService from '../services/api/login/login.service';
import RegisterService from '../services/api/register/register.service';
import UsersService from '../services/api/users/users.service';

const AuthContext = React.createContext({});

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      loadingCurrentUser: false,
    };
  }

  componentDidMount() {
    this.refreshCurrentUser();
  }

  refreshCurrentUser = () => {
    this.setState({ loadingCurrentUser: true });

    return UsersService.getCurrentUser().then(user =>
      this.setState({
        user,
        loadingCurrentUser: false,
      })
    );
  };

  login = (email, password) => {
    return LoginService.login(email, password).then(this.refreshCurrentUser);
  };

  logout = () => {
    return LoginService.logout().then(() => {
      this.setState({ user: undefined });
    });
  };

  register = (firstName, lastName, email, password) => {
    return RegisterService.register(firstName, lastName, email, password).then(
      () => this.login(email, password)
    );
  };

  render() {
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{
          refreshCurrentUser: this.refreshCurrentUser,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          register: this.register,
          loadingCurrentUser: this.state.loadingCurrentUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
