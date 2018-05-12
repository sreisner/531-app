import React from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import { BeginCycle } from './pages/beginCycle/beginCycle.component';
import { AppBar531 } from './core/appBar531/appBar531.component';

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
      <BeginCycle />
    </div>
  );
};

export default withRoot(withStyles(styles)(App));
