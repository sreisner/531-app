import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from './context/authContext.component.js';
import AppBar531 from './core/appBar531/appBar531.component';
import Loading from './core/loading/loading.component';
import CycleRoutes from './views/cycle/cycle.routes';
import withRoot from './withRoot';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
  },
  content: {
    padding: '16px'
  }
});

let DefaultPathForwarder = props => {
  const { history, user } = props;

  const forwardTo = path => history.replace(path);

  if (user && user.currentCycleId) {
    forwardTo(`/cycle/${user.currentCycleId}`);
  } else {
    forwardTo('/cycle/generator/form');
  }

  return null;
};

DefaultPathForwarder = withRouter(DefaultPathForwarder);

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <AuthConsumer>
        {({ loadingCurrentUser, user }) =>
          loadingCurrentUser ? (
            <Loading variant="title" />
          ) : (
            <div className={classes.root}>
              <AppBar531 title="5/3/1" />
              <div className={classes.content}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <DefaultPathForwarder user={user} />}
                  />
                  <Route path="/cycle" component={CycleRoutes} />
                </Switch>
              </div>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default withRouter(withRoot(withStyles(styles)(App)));
