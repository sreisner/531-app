import React, { Component } from 'react';

class NumCyclesStep extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { key } = this.props;

    return (
      <Step key={key}>
        <StepLabel>Programming</StepLabel>
        <StepContent />
      </Step>
    );
  }
}

export default NumCyclesStep;
