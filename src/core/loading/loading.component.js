import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  root: {
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

Loading = withStyles(styles)(Loading);
export { Loading };
