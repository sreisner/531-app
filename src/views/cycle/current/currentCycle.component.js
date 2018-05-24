import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import SessionGrid from '../core/sessionGrid.component';

const styles = theme => ({});

let CurrentCycle = props => (
  <div>
    <SessionGrid cycle={props.cycle} />
  </div>
);

CurrentCycle.propTypes = {
  classes: PropTypes.object.isRequired,
  cycle: PropTypes.array.isRequired,
};

CurrentCycle = withStyles(styles)(CurrentCycle);
export default CurrentCycle;
