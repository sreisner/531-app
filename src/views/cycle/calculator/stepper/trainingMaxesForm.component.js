import { TextField } from '@material-ui/core';
import React, { Component } from 'react';

class TrainingMaxesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = event => {
    this.props.onChange(event.target.name, event.target.value);
  };

  render() {
    const { trainingMaxes } = this.props;
    const { squat, bench, deadlift, press } = trainingMaxes;

    return (
      <React.Fragment>
        <TextField
          label="Squat TM"
          value={squat}
          name="squat"
          type="number"
          onChange={this.onChange}
          required
          error={!squat}
        />
        <TextField
          label="Deadlift TM"
          value={deadlift}
          name="deadlift"
          type="number"
          onChange={this.onChange}
          required
          error={!deadlift}
        />
        <TextField
          label="Bench Press TM"
          value={bench}
          name="bench"
          type="number"
          onChange={this.onChange}
          required
          error={!bench}
        />
        <TextField
          label="Overhead Press TM"
          value={press}
          name="press"
          type="number"
          onChange={this.onChange}
          required
          error={!press}
        />
      </React.Fragment>
    );
  }
}

export default TrainingMaxesForm;
