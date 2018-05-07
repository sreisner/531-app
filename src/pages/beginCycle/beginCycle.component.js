import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { TrainingMaxesService } from '../../services/api/users/trainingMaxes/trainingMaxes.service';
import { Paper } from 'material-ui';
import { BeginCycleStepper } from './components/beginCycleStepper.component';
import { SetTrainingMaxes } from './components/setTrainingMaxes.component';

const styles = theme => ({
    gutters: theme.mixins.gutters({}),
    paper: {
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2
    }
});

class BeginCycle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            activeStep: 0,
            trainingMaxes: {}
        };

        this.getActiveStepForm = this.getActiveStepForm.bind(this);
        this.handleTrainingMaxChange = this.handleTrainingMaxChange.bind(this);
    }

    componentDidMount() {
        TrainingMaxesService
            .getTrainingMaxes('current')
            .then(trainingMaxes => this.setState({ 
                loading: false,
                trainingMaxes
            }));
    }

    handleTrainingMaxChange(lift, weight) {
        this.setState(prevState => ({
            trainingMaxes: {
                ...prevState.trainingMaxes,
                [lift]: weight
            }
        }));
    }

    getActiveStepForm() {
        switch (this.state.activeStep) {
            case 0:
                return (
                    <SetTrainingMaxes
                        onChange={this.handleTrainingMaxChange}
                        trainingMaxes={this.state.trainingMaxes} />
                );
            case 1:
                return <h1>Choose template</h1>;
            case 2:
                return <h1>Select options</h1>;
            default:
                return <h1>Unknown step</h1>;
        }
    }

    render() {
        const { classes } = this.props;
        const { loading, activeStep } = this.state;

        if (loading) {
            return <h1>Loading...</h1>;
        }

        return (
            <div>
                <AppBar531 title="Begin Cycle" />
                <div className={classes.gutters}>
                    <Paper className={classes.paper}>
                        <BeginCycleStepper activeStep={activeStep} />
                    </Paper>
                    <Paper className={classes.paper}>
                        {this.getActiveStepForm()}
                    </Paper>
                </div>
            </div>
        );
    }
}

BeginCycle.propTypes = {
    classes: PropTypes.object.isRequired
};

BeginCycle = withStyles(styles)(BeginCycle);
export { BeginCycle };