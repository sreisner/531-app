import { Grid, Stepper, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import CalculatorStep from './calculatorStep.component';
import TrainingMaxesForm from './trainingMaxesForm.component';

const styles = theme => ({
  grid: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
    },
  }),
});

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
    const { classes } = this.props;
    const { activeStep, trainingMaxes } = this.state;

    return (
      <Grid container className={classes.grid}>
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
              label="Template"
              description="Choose a template."
              handleNext={this.handleNext}
              handleBack={this.handleBack}
            />
            <CalculatorStep
              label="Options"
              description="Choose options for this template."
              handleBack={this.handleBack}
            />
          </Stepper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CycleCalculatorStepper);
