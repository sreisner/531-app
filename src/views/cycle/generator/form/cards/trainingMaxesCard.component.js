import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import TitleCard from './titleCard.component';

let TrainingMaxesCard = props => {
  const { trainingMaxes, onChange } = props;
  const { squat, deadlift, press, bench } = trainingMaxes;

  return (
    <TitleCard title="Training Maxes">
      <TextField
        label="Squat TM"
        value={squat}
        name="squat"
        type="number"
        onChange={onChange}
        required
        error={!squat}
      />
      <TextField
        label="Deadlift TM"
        value={deadlift}
        name="deadlift"
        type="number"
        onChange={onChange}
        required
        error={!deadlift}
      />
      <TextField
        label="Bench Press TM"
        value={bench}
        name="bench"
        type="number"
        onChange={onChange}
        required
        error={!bench}
      />
      <TextField
        label="Overhead Press TM"
        value={press}
        name="press"
        type="number"
        onChange={onChange}
        required
        error={!press}
      />
    </TitleCard>
  );
};

TrainingMaxesCard.propTypes = {
  trainingMaxes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TrainingMaxesCard;
