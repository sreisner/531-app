import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { TextField, Select, MenuItem, Typography } from 'material-ui';
import { Grid } from 'material-ui';
import { UsersService } from '../../services/api/users/users.service';
import { TitleCard } from './components/titleCard.component';

const styles = theme => ({
    grid: {
        padding: theme.spacing.unit * 3
    }
});

class BeginCycle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingTrainingMaxes: true,
            trainingMaxes: {
                squat: '',
                deadlift: '',
                bench: '',
                press: ''
            },

            loadingTemplates: true,
            templates: [],
            selectedTemplateId: 0
        };

        this.handleTrainingMaxChange = this.handleTrainingMaxChange.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
    }

    componentDidMount() {
        UsersService
            .getTrainingMaxes('current')
            .then(trainingMaxes => this.setState(prevState => ({ 
                loadingTrainingMaxes: false,
                trainingMaxes: {
                    ...prevState.trainingMaxes,
                    ...trainingMaxes
                }
            })));

        setTimeout(() => this.setState({
            loadingTemplates: false,
            templates: [{
                id: 1,
                name: 'Forever BBB'
            }, {
                id: 2,
                name: 'Original BBB'
            }],
            selectedTemplateId: 1
        }), 3000);
    }

    handleTrainingMaxChange(event) {
        const { name: lift, value: weight } = event.target;
        
        this.setState(prevState => ({
            trainingMaxes: {
                ...prevState.trainingMaxes,
                [lift]: weight
            }
        }));
    }

    handleTemplateChange(event) {
        this.setState({ selectedTemplateId: event.target.value });
    }

    render() {
        const { classes } = this.props;
        const {
            trainingMaxes,
            selectedTemplateId,
            loadingTrainingMaxes,
            loadingTemplates,
            loadingOptions
        } = this.state;

        const {
            squat,
            deadlift,
            bench,
            press
        } = trainingMaxes;

        return (
            <div>
                <AppBar531 title="Begin Cycle" />
                <Grid container className={classes.grid}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TitleCard title="Training Maxes">
                            <TextField
                                label="Squat TM"
                                value={squat}
                                name="squat"
                                type="number"
                                onChange={this.handleTrainingMaxChange} />
                            <TextField
                                label="Deadlift TM"
                                value={deadlift}
                                name="deadlift"
                                type="number"
                                onChange={this.handleTrainingMaxChange} />
                            <TextField
                                label="Bench Press TM"
                                value={bench}
                                name="bench"
                                type="number"
                                onChange={this.handleTrainingMaxChange} />
                            <TextField
                                label="Overhead Press TM"
                                value={press}
                                name="press"
                                type="number"
                                onChange={this.handleTrainingMaxChange} />
                        </TitleCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TitleCard title="Template">
                            <Select
                                value={selectedTemplateId}
                                onChange={this.handleTemplateChange}
                                disabled={loadingTemplates}
                            >
                                {this.state.templates.map(t =>
                                    <MenuItem
                                        key={t.id}
                                        value={t.id}
                                    >
                                        {t.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </TitleCard>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TitleCard title="Options">
                            {selectedTemplateId === 0 ? (
                                <Typography variant="caption">
                                    Select a template
                                </Typography>
                            ) : (
                                <Typography variant="caption">
                                    Select a template
                                </Typography>
                            )}
                        </TitleCard>
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