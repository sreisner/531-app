import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from './context/authContext.component.js';
import AppBar531 from './core/appBar531/appBar531.component';
import Loading from './core/loading/loading.component';
import CycleContainer from './views/cycle/cycle.container.js';
import withRoot from './withRoot';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
  },
});

let DefaultPathForwarder = props => {
  const forwardTo = path => props.history.replace(path);

  if (props.user) {
    forwardTo('/cycle/current');
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
        {({ loading, user }) =>
          loading ? (
            <Loading variant="title" />
          ) : (
            <div className={classes.root}>
              <AppBar531 title="5/3/1" />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <DefaultPathForwarder user={user} />}
                />
                <Route path="/cycle" component={CycleContainer} />
              </Switch>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default withRouter(withRoot(withStyles(styles)(App)));
