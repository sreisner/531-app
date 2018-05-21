import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const styles = theme => ({});

class NotLoggedInDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Typography variant="title" color="inherit">
        Figure out something to put here for users who aren't logged in.
      </Typography>
    );
  }
}

NotLoggedInDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

NotLoggedInDashboard = withRouter(withStyles(styles)(NotLoggedInDashboard));
export { NotLoggedInDashboard };
