import React from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import { BeginCycle } from './pages/beginCycle/beginCycle.component';
import { AppBar531 } from './core/appBar531/appBar531.component';
import { Route, Switch } from 'react-router-dom';
import { Cycle } from './pages/cycle/cycle.component';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
  },
});

const App = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar531 />
      <Switch>
        <Route exact path="/" component={BeginCycle} />
        <Route exact path="/cycle" component={Cycle} />
      </Switch>
    </div>
  );
};

export default withRoot(withStyles(styles)(App));
