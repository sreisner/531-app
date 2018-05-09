import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { TextField, Select, MenuItem, Typography, FormControl, FormControlLabel, FormLabel, InputLabel } from 'material-ui';
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
        this.handleOptionChange = this.handleOptionChange.bind(this);
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
                name: 'Forever BBB',
                options: [
                    {
                        name: 'Supplemental TM Percentage',
                        type: 'select',
                        value: 30,
                        values: [
                            {
                                display: '30%',
                                value: 30
                            },
                            {
                                display: '40%',
                                value: 40
                            },
                            {
                                display: '50%',
                                value: 50
                            },
                            {
                                display: '60%',
                                value: 60
                            }
                        ]
                    }
                ]
            }, {
                id: 2,
                name: 'Original BBB',
                options: []
            }],
            selectedTemplateId: 1
        }), 1000);
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

    handleOptionChange(event) {
        console.log(event);
    }

    render() {
        const { classes } = this.props;
        const {
            trainingMaxes,
            selectedTemplateId,
            loadingTrainingMaxes,
            loadingTemplates,
            templates
        } = this.state;

        const {
            squat,
            deadlift,
            bench,
            press
        } = trainingMaxes;

        const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

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
                                {templates.map(t =>
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
                            {!selectedTemplate ? (
                                <Typography variant="caption">
                                    You must select a template to customize options.
                                </Typography>
                            ) : selectedTemplate.options.length === 0 ? (
                                <Typography variant="caption">
                                    There are no options available for this template.
                                </Typography>
                            ) : (
                                selectedTemplate.options.map(o => {
                                    if (o.type === 'select') {
                                        return (
                                            <FormControl>
                                                <InputLabel htmlFor={o.name}>{o.name}</InputLabel>
                                                <Select
                                                    key={o.name}
                                                    value={o.value}
                                                    onChange={this.handleOptionChange}
                                                    inputProps={{name: o.name}}
                                                >
                                                    {o.values.map(v => (
                                                        <MenuItem
                                                            key={v.value}
                                                            value={v.value}
                                                        >
                                                            {v.display}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        );
                                    }
                                })
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