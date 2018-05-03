import React, { Component } from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import AppBar531 from './AppBar531';
import TrainingMaxForm from './TrainingMaxForm';
import WorkoutTable from './WorkoutTable';
import WorkoutGenerator from './WorkoutGenerator';

const styles = theme => ({});

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
        const WEEK = 1;
        const DAY = 1;

        const rows = this.state.trainingMaxes
            && WorkoutGenerator.generateForeverBBBWorkout(WEEK, DAY, this.state.trainingMaxes);
        
        const table = rows && <WorkoutTable rows={rows} week={WEEK} day={DAY} />

        return (
            <div className="app">
                <AppBar531 />
        
                <TrainingMaxForm onSubmit={this.generatePlan} />

                {table}
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(App));
