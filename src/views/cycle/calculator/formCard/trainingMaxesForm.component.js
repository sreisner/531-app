import { Grid, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';

class TrainingMaxesForm extends Component {
  onChange = event => {
    this.props.onChange(event.target.name, event.target.value);
  };

  render() {
    const { squat, bench, deadlift, press } = this.props;

    return (
      <Grid container direction="column">
        <Grid item>
          <Typography variant="title" gutterBottom>
            Training Maxes
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Squat TM"
            value={squat}
            name="squat"
            type="number"
            onChange={this.onChange}
            error={!squat}
            required
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Deadlift TM"
            value={deadlift}
            name="deadlift"
            type="number"
            onChange={this.onChange}
            error={!deadlift}
            required
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Bench Press TM"
            value={bench}
            name="bench"
            type="number"
            onChange={this.onChange}
            error={!bench}
            required
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Overhead Press TM"
            value={press}
            name="press"
            type="number"
            onChange={this.onChange}
            error={!press}
            required
            fullWidth
          />
        </Grid>
      </Grid>
    );
  }
}

export default TrainingMaxesForm;
