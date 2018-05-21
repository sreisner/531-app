import React from 'react';
import PropTypes from 'prop-types';
import { TitleCard } from './titleCard.component';
import { TextField } from '@material-ui/core';

let TrainingMaxesCard = props => {
  const { loading, trainingMaxes, onChange } = props;
  const { squat, deadlift, press, bench } = trainingMaxes;

  return (
    <TitleCard title="Training Maxes" loading={loading}>
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
  loading: PropTypes.bool.isRequired,
};

export { TrainingMaxesCard };
