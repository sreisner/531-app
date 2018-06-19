import {
  Button,
  Step,
  StepContent,
  StepLabel,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { Component } from 'react';

const styles = theme => ({
  actionsContainer: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CalculatorStep extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      label,
      description,
      handleBack,
      handleNext,
      children,
      classes,
      ...stepProps
    } = this.props;

    return (
      <Step key={label} {...stepProps}>
        <StepLabel>{label}</StepLabel>
        <StepContent>
          <Typography>{description}</Typography>

          {children}

          <div className={classes.actionsContainer}>
            <Button disabled={!handleBack} onClick={handleBack}>
              Back
            </Button>
            <Button variant="raised" color="primary" onClick={handleNext}>
              {handleNext ? 'Next' : 'Calculate'}
            </Button>
          </div>
        </StepContent>
      </Step>
    );
  }
}

export default withStyles(styles)(CalculatorStep);
