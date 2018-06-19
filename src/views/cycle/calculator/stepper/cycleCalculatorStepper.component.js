import { Grid, Stepper } from '@material-ui/core';
import React, { Component } from 'react';
import CalculatorStep from './calculatorStep.component';
import TrainingMaxesForm from './trainingMaxesForm.component';

class CycleCalculatorStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,

      trainingMaxes: {},
    };
  }

  handleBack = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep - 1,
    }));
  };

  handleNext = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1,
    }));
  };

  onTrainingMaxChange = (lift, value) => {
    this.setState(({ trainingMaxes }) => ({
      trainingMaxes: {
        ...trainingMaxes,
        [lift]: value,
      },
    }));
  };

  render() {
    const { activeStep, trainingMaxes } = this.state;

    return (
      <Grid container>
        <Grid item xs={12} md={3}>
          <Stepper activeStep={activeStep} orientation="vertical">
            <CalculatorStep
              label="Training Maxes"
              description="Training maxes are usually 85% - 90% of your one-rep max."
              handleNext={this.handleNext}
            >
              <TrainingMaxesForm
                trainingMaxes={trainingMaxes}
                onChange={this.onTrainingMaxChange}
              />
            </CalculatorStep>
            <CalculatorStep
              label="Training Maxes"
              description="Training maxes are usually 85% - 90% of your one-rep max."
              handleBack={this.handleBack}
            >
              <TrainingMaxesForm
                trainingMaxes={trainingMaxes}
                onChange={this.onTrainingMaxChange}
              />
            </CalculatorStep>
          </Stepper>
        </Grid>
      </Grid>
    );
  }
}

export default CycleCalculatorStepper;
