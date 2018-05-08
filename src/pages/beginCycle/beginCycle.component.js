import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { TrainingMaxesService } from '../../services/api/users/trainingMaxes/trainingMaxes.service';
import { Paper } from 'material-ui';
import { SetTrainingMaxes } from './components/setTrainingMaxes.component';
import { Typography } from 'material-ui';

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
            trainingMaxes: {}
        };

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

    render() {
        const { classes } = this.props;
        const { loading } = this.state;

        if (loading) {
            return <h1>Loading...</h1>;
        }

        return (
            <div>
                <AppBar531 title="Begin Cycle" />
                <div className={classes.gutters}>
                    <Paper className={classes.paper}>
                        <Typography
                            variant="title"
                            color="inherit"
                            >
                            1. Set training maxes
                        </Typography>
                        <SetTrainingMaxes
                            onChange={this.handleTrainingMaxChange}
                            trainingMaxes={this.state.trainingMaxes} />
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