import React, { Component } from 'react';
import AppBar531 from './AppBar531';
import TrainingMaxForm from './TrainingMaxForm';
import WorkoutTable from './WorkoutTable';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.generatePlan = this.generatePlan.bind(this);
    }

    generatePlan(trainingMaxes) {
        this.setState({trainingMaxes});
    }

    render() {
        return (
            <div className="app">
                <AppBar531 />
        
                <TrainingMaxForm onSubmit={this.generatePlan} />

                {this.state.trainingMaxes &&
                <WorkoutTable />
                }
            </div>
        );
    }
}

export default App;
