import React, { Component } from 'react';
import AppBar531 from './AppBar531';
import Button from 'material-ui/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.calculate = this.calculate.bind(this);
    this.updateSquatTm = this.updateSquatTm.bind(this);
    this.updateDeadliftTm = this.updateDeadliftTm.bind(this);
    this.updateOverheadPressTm = this.updateOverheadPressTm.bind(this);
    this.updateBenchPressTm = this.updateBenchPressTm.bind(this);
  }

  calculate(event) {
    console.log(this.state);
    event.preventDefault();
  }

  updateSquatTm(event) {
    this.setState({squatTm: +event.target.value});
  }

  updateDeadliftTm(event) {
    this.setState({deadliftTm: +event.target.value});
  }

  updateOverheadPressTm(event) {
    this.setState({overheadPressTm: +event.target.value});
  }

  updateBenchPressTm(event) {
    this.setState({benchPressTm: +event.target.value});
  }

  render() {
    return (
      <div className="app">
        <AppBar531 />
        
        <form onSubmit={this.calculate}>
          {/* <TextField
            floatingLabelText="Squat TM"
            onChange={this.updateSquatTm} />

          <TextField
            floatingLabelText="Deadlift TM"
            onChange={this.updateDeadliftTm} />
          
          <TextField
            floatingLabelText="Overhead Press TM"
            onChange={this.updateOverheadPressTm} />

          <TextField
            floatingLabelText="Bench Press TM"
            onChange={this.updateBenchPressTm} /> */}

          <Button
            color="primary"
            variant="raised"
            onClick={this.calculate}>
            Calculate
          </Button>
        </form>
      </div>
    );
  }
}

export default App;
