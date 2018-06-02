import { Grid, TextField, withStyles } from '@material-ui/core';
import { RemoveRedEye } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  input: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
  },
  eye: {
    color: theme.palette.primary.light,
    cursor: 'pointer',
  },
});

let PasswordInput = props => (
  <Grid container alignItems="center">
    <Grid item className={props.classes.flex}>
      <TextField
        className={props.classes.input}
        label="Password"
        value={props.password}
        name="password"
        type={props.masked ? 'password' : 'text'}
        onChange={props.handleChange}
      />
    </Grid>
    <Grid item>
      <RemoveRedEye
        className={props.classes.eye}
        onClick={props.togglePasswordMask}
      />
    </Grid>
  </Grid>
);

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  masked: PropTypes.bool.isRequired,
  togglePasswordMask: PropTypes.func.isRequired,
};

export default withStyles(styles)(PasswordInput);
