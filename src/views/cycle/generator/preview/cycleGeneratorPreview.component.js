import { Button, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import React from 'react';
import SessionGridContainer from '../../core/sessionGrid.container';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

let CycleGeneratorPreview = props => {
  const { classes, cycle, isLoggedIn, onStartCycleClick } = props;

  return (
    <div>
      <SessionGridContainer cycle={cycle} />
      {isLoggedIn && (
        <Tooltip title="Start Cycle" placement="left">
          <Button
            variant="fab"
            color="secondary"
            className={classes.fab}
            onClick={onStartCycleClick}
          >
            <CheckIcon />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

CycleGeneratorPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  cycle: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onStartCycleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(CycleGeneratorPreview);
