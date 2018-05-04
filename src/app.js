import React, { Component } from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import AppBar531 from './appBar531/appBar531.component';
import TrainingMaxForm from './trainingMaxForm/trainingMaxForm.component';
import WorkoutTable from './workoutTable/workoutTable.component';
import WorkoutGenerator from './workoutGenerator/workoutGenerator.component';
import loginService from './api/login/login.service';
import trainingMaxService from './api/users/trainingMaxes/trainingMaxes.service';

const styles = theme => ({});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.generatePlan = this.generatePlan.bind(this);
    }

    componentDidMount() {
        loginService.login('shawn.reisner@gmail.com', 'password')
            .then(user => trainingMaxService.getTrainingMaxes(user.id));
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
