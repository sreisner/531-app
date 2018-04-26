import React, { Component } from 'react';
import '../node_modules/mustard-ui/dist/css/mustard-ui.min.css';

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
        <form onSubmit={this.calculate}>
          <div className="form-control-group">
            <div className="form-control">
              <label>Squat TM</label>
              <input type="text"
                     onChange={this.updateSquatTm} />
            </div>
            <div className="form-control">
              <label>Deadlift TM</label>
              <input type="text"
                     onChange={this.updateDeadliftTm} />
            </div>
            <div className="form-control">
              <label>Overhead Press TM</label>
              <input type="text"
                     onChange={this.updateOverheadPressTm} />
            </div>
            <div className="form-control">
              <label>Bench Press TM</label>
              <input type="text"
                     onChange={this.updateBenchPressTm} />
            </div>
          </div>
          <input type="submit" value="Calculate" className="float-right" />
        </form>
      </div>
    );
  }
}

export default App;
