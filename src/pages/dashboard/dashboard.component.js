import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, withStyles } from '@material-ui/core';

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
        <Typography variant="title" color="inherit" gutterBottom={true}>
          You haven't started a cycle yet.
        </Typography>
        <Button variant="raised" color="primary">
          Get Started
        </Button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

Dashboard = withStyles(styles)(Dashboard);
export default Dashboard;
