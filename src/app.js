import React from 'react';
import withRoot from './withRoot';
import { withStyles } from '@material-ui/core/styles';
import { AppBar531 } from './core/appBar531/appBar531.component';
import { Route, Switch } from 'react-router-dom';
import { Cycle } from './pages/cycle/cycle.component';
import { AuthProvider } from './context/authContext.context';
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
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AuthProvider>
          <AppBar531 title="5/3/1" />
        </AuthProvider>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/cycle" component={Cycle} />
        </Switch>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));
