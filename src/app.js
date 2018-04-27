import React, { Component } from 'react';
import AppBar531 from './AppBar531';
import TrainingMaxForm from './TrainingMaxForm';
import CycleTable from './CycleTable';

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
                <CycleTable trainingMaxes={this.state.trainingMaxes} />
                }
            </div>
        );
    }
}

export default App;
