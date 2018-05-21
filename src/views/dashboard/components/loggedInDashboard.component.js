import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const styles = theme => ({});

class LoggedInDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getStarted = () => {
    this.props.history.push('/cycle-generator');
  };

  render() {
    return (
      <div>
        <Typography variant="title" color="inherit" gutterBottom={true}>
          You haven't started a cycle yet.
        </Typography>
        <Button variant="raised" color="primary" onClick={this.getStarted}>
          Get Started
        </Button>
      </div>
    );
  }
}

LoggedInDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

LoggedInDashboard = withRouter(withStyles(styles)(LoggedInDashboard));
export { LoggedInDashboard };
