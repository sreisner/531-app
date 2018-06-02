import React from 'react';
import LoginService from '../services/api/login/login.service';
import RegisterService from '../services/api/register/register.service';
import UsersService from '../services/api/users/users.service';

const AuthContext = React.createContext({});

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: undefined,
    };
  }

  componentDidMount() {
    this.refreshCurrentUser();
  }

  refreshCurrentUser = () => {
    this.setState({ loading: true });

    return UsersService.getCurrentUser().then(user =>
      this.setState({
        user,
        loading: false,
      })
    );
  };

  login = (email, password) => {
    this.setState({ loading: true });

    return LoginService.login(email, password).then(this.refreshCurrentUser);
  };

  logout = () => {
    this.setState({ loading: true });

    return LoginService.logout().then(() => {
      this.setState({ user: undefined, loading: false });
    });
  };

  register = (email, password) => {
    this.setState({ loading: true });

    return RegisterService.register(email, password)
      .then(() => this.login(email, password))
      .then(() => this.setState({ loading: false }));
  };

  render() {
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{
          loading: this.state.loading,
          refreshCurrentUser: this.refreshCurrentUser,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          register: this.register,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
