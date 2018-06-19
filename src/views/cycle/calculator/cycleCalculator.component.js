import React, { Component } from 'react';
import CycleCalculatorStepper from './stepper/cycleCalculatorStepper.component';

class CycleCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <CycleCalculatorStepper />;
  }
}

export default CycleCalculator;
