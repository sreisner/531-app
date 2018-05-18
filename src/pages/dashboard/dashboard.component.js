import { Button, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthConsumer } from '../../context/authContext.context';

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
          {({ isLoggedIn }) =>
            isLoggedIn ? (
              <div>
                <Typography variant="title" color="inherit" gutterBottom={true}>
                  You haven't started a cycle yet.
                </Typography>
                <Button variant="raised" color="primary">
                  Get Started
                </Button>
              </div>
            ) : (
              <Typography variant="title" color="inherit">
                Figure out something to put here for users who aren't logged in.
              </Typography>
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
