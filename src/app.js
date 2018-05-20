import React from 'react';
import withRoot from './withRoot';
import { withStyles } from '@material-ui/core/styles';
import { AppBar531 } from './core/appBar531/appBar531.component';
import { Route, Switch } from 'react-router-dom';
import { Cycle } from './pages/cycle/cycle.component';
import { CycleGenerator } from './pages/cycleGenerator/cycleGenerator.component';
import Dashboard from './pages/dashboard/dashboard.component';
import { Loading } from './core/loading/loading.component';
import { withRouter } from 'react-router-dom';
import { AuthConsumer } from './context/authContext.component.js';

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
      <AuthConsumer>
        {({ loading }) =>
          loading ? (
            <Loading variant="title" />
          ) : (
            <div className={classes.root}>
              <AppBar531 title="5/3/1" />
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/cycle" component={Cycle} />
                <Route
                  exact
                  path="/cycle-generator"
                  component={CycleGenerator}
                />
              </Switch>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default withRouter(withRoot(withStyles(styles)(App)));
