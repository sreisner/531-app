import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { Paper } from 'material-ui';
import { SetTrainingMaxes } from './components/setTrainingMaxes.component';
import { TemplateSelect } from './components/templateSelect.component';
import { Typography } from 'material-ui';
import { Grid } from 'material-ui';
import { UsersService } from '../../services/api/users/users.service';

const styles = theme => ({
    grid: {
        padding: theme.spacing.unit * 3
    },
    paper: {
        padding: theme.spacing.unit * 4,
        height: '100%'
    },
    inputContainer: {
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        width: '50%'
    }
});

class BeginCycle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            trainingMaxes: {
                squat: '',
                deadlift: '',
                bench: '',
                press: ''
            },
            selectedTemplateId: 0
        };

        this.handleTrainingMaxChange = this.handleTrainingMaxChange.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
    }

    componentDidMount() {
        UsersService
            .getTrainingMaxes('current')
            .then(trainingMaxes => this.setState(prevState => ({ 
                loading: false,
                trainingMaxes: {
                    ...prevState.trainingMaxes,
                    ...trainingMaxes
                }
            })));
    }

    handleTrainingMaxChange(lift, weight) {
        this.setState(prevState => ({
            trainingMaxes: {
                ...prevState.trainingMaxes,
                [lift]: weight
            }
        }));
    }

    handleTemplateChange(selectedTemplateId) {
        this.setState({ selectedTemplateId });
    }

    render() {
        const { classes } = this.props;
        const { trainingMaxes, selectedTemplateId } = this.state;

        return (
            <div>
                <AppBar531 title="Begin Cycle" />
                <Grid container className={classes.grid}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="title" gutterBottom={true}>
                                Training Maxes
                            </Typography>
                            <div className={classes.inputContainer}>
                                <SetTrainingMaxes
                                    onChange={this.handleTrainingMaxChange}
                                    {...trainingMaxes} />
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="title" gutterBottom={true}>
                                Template
                            </Typography>
                            <div className={classes.inputContainer}>
                                <TemplateSelect
                                    onChange={this.handleTemplateChange}
                                    value={selectedTemplateId} />
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="title" gutterBottom={true} >
                                Options
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

BeginCycle.propTypes = {
    classes: PropTypes.object.isRequired
};

BeginCycle = withStyles(styles)(BeginCycle);
export { BeginCycle };