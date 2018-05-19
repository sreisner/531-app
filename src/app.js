import React from 'react';
import withRoot from './withRoot';
import { withStyles } from '@material-ui/core/styles';
import { AppBar531 } from './core/appBar531/appBar531.component';
import { Route, Switch } from 'react-router-dom';
import { Cycle } from './pages/cycle/cycle.component';
import { CycleGenerator } from './pages/cycleGenerator/cycleGenerator.component';
import { AuthProvider } from './context/authContext.context';
import Dashboard from './pages/dashboard/dashboard.component';
import { UsersService } from './services/api/users/users.service';
import { Loading } from './core/loading/loading.component';
import { withRouter } from 'react-router-dom';

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
      loading: true,
    };
  }

  componentDidMount() {
    UsersService.getCurrentUser().then(user => {
      const isLoggedIn = !!user._id;

      if (!isLoggedIn) {
        // TODO:  Set isLoggedIn to false
        this.props.onLogout();
        this.props.history.push('/');
      }

      this.setState({ loading: false });
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return <Loading variant="title" />;
    }

    return (
      <div className={classes.root}>
        <AppBar531 title="5/3/1" />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/cycle" component={Cycle} />
          <Route exact path="/cycle-generator" component={CycleGenerator} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withRoot(withStyles(styles)(App)));
