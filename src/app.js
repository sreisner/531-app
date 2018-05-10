import React from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './pages/home/home.component';
import { Login } from './pages/login/login.component';
import { PrivateRoute } from './core/privateRoute/privateRoute.component';
import { LoginRoute } from './core/loginRoute/loginRoute.component';
import { BeginCycle } from './pages/beginCycle/beginCycle.component';
import { Cycle } from './pages/cycle/cycle.component';

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
  }

  handleSuccessfulLogin(user) {
    localStorage.isLoggedIn = true;
    this.forceUpdate();
  }

  render() {
    const { classes } = this.props;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <LoginRoute
            exact
            path="/login"
            component={Login}
            onSuccess={this.handleSuccessfulLogin}
          />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/begin-cycle" component={BeginCycle} />
          <PrivateRoute exact path="/cycle" component={Cycle} />
        </div>
      </BrowserRouter>
    );
  }
}

export default withRoot(withStyles(styles)(App));
