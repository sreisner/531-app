import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import SessionGrid from '../../core/sessionGrid.component';

const styles = theme => ({});

let CycleGeneratorPreview = props => {
  const { classes, cycle } = props;

  return (
    <div className={classes.grid}>
      <SessionGrid cycle={cycle} />
    </div>
  );
};

CycleGeneratorPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  cycle: PropTypes.array.isRequired,
};

export default withStyles(styles)(CycleGeneratorPreview);
