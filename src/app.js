import React from 'react';
import withRoot from './withRoot';
import { withStyles } from '@material-ui/core/styles';
import { AppBar531 } from './core/appBar531/appBar531.component';
import { Route, Switch } from 'react-router-dom';
import { Cycle } from './pages/cycle/cycle.component';
import { AuthContext } from './context/authContext.context';
import Dashboard from './pages/dashboard/dashboard.component';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: localStorage.isLoggedIn === 'true',
    };
  }

  componentDidMount() {
    setInterval(() => !this.state.isLoggedIn && this.onLogout(), 1000);
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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AuthContext.Provider
          value={{
            isLoggedIn: this.state.isLoggedIn,
            onLoginSuccess: this.onLoginSuccess,
            onLogout: this.onLogout,
          }}
        >
          <AppBar531 title="5/3/1" />
        </AuthContext.Provider>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/cycle" component={Cycle} />
        </Switch>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));
