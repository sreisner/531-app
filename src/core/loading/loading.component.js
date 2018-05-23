import { CircularProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

let Loading = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant={props.variant} color="inherit">
        Loading...
      </Typography>
      <CircularProgress />
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
