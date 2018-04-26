import React, { Component } from 'react';
import AppBar531 from './AppBar531';
import TrainingMaxForm from './TrainingMaxForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.generatePlan = this.generatePlan.bind(this);
    }

    generatePlan(trainingMaxes) {
        console.log(trainingMaxes);
    }

    render() {
        return (
            <div className="app">
                <AppBar531 />
        
                <TrainingMaxForm onSubmit={this.generatePlan} />
            </div>
        );
    }
}

export default App;
