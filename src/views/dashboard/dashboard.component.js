import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthConsumer } from '../../context/authContext.component';
import { NotLoggedInDashboard } from './components/notLoggedInDashboard.component';
import { LoggedInDashboard } from './components/loggedInDashboard.component';

const styles = theme => ({
  root: theme.mixins.gutters({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  }),
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AuthConsumer>
          {({ isLoggedIn, user }) =>
            isLoggedIn ? (
              <LoggedInDashboard user={user} />
            ) : (
              <NotLoggedInDashboard />
            )
          }
        </AuthConsumer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

Dashboard = withStyles(styles)(Dashboard);
export default Dashboard;
