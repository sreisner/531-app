import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { TextField, Select, MenuItem, Typography, FormControl, InputLabel } from 'material-ui';
import { Grid } from 'material-ui';
import { UsersService } from '../../services/api/users/users.service';
import { TitleCard } from './components/titleCard.component';
import { Button } from 'material-ui';

const styles = theme => ({
    form: theme.mixins.gutters({
        paddingTop: theme.spacing.unit * 3
    }),
    submitContainer: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    submitButton: {
        [theme.breakpoints.only('xs')]: {
            width: '100%'
        },
        float: 'right'
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

        this.loadTrainingMaxes = this.loadTrainingMaxes.bind(this);
        this.loadTemplates = this.loadTemplates.bind(this);
        this.handleTrainingMaxChange = this.handleTrainingMaxChange.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.getSelectedTemplate = this.getSelectedTemplate.bind(this);
    }

    componentDidMount() {
        this.loadTrainingMaxes();
        this.loadTemplates();
    }

    loadTrainingMaxes() {
        UsersService
            .getTrainingMaxes('current')
            .then(trainingMaxes => this.setState(prevState => ({ 
                loadingTrainingMaxes: false,
                trainingMaxes: {
                    ...prevState.trainingMaxes,
                    ...trainingMaxes
                }
            })));
    }

    loadTemplates() {
        setTimeout(() => this.setState({
            loadingTemplates: false,
            templates: [{
                id: 1,
                name: 'Forever BBB',
                options: [{
                    name: 'Supplemental TM Percentage',
                    type: 'select',
                    value: 30,
                    values: [{
                        display: '30%',
                        value: 30
                    }, {
                        display: '40%',
                        value: 40
                    }, {
                        display: '50%',
                        value: 50
                    }, {
                        display: '60%',
                        value: 60
                    }]
                }, {
                    name: 'Days Per Week',
                    type: 'select',
                    value: 3,
                    values: [{
                        display: '3',
                        value: 3
                    }, {
                        display: '4',
                        value: 4
                    }]
                }]
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
        const { selectedTemplateId } = this.state;
        const { name, value } = event.target;

        this.setState(prevState => ({
            templates: prevState.templates
                .map(template => template.id === selectedTemplateId
                    ? {
                        ...template,
                        options: template.options
                            .map(option => option.name === name
                                ? { ...option, value} : option)
                    }
                    : template)
        }));

        console.log(this.state.templates);
    }

    handleFormSubmission(event) {
        event.preventDefault();
        console.log(event);
    }

    getSelectedTemplate() {
        const { templates, selectedTemplateId } = this.state;
        return templates.find(t => t.id === selectedTemplateId);
    }

    formIsValid() {
        const { selectedTemplateId } = this.state;
        const { squat, deadlift, bench, press } = this.state.trainingMaxes;
        return squat && deadlift && bench && press && selectedTemplateId;
    }

    render() {
        const { classes } = this.props;
        const { selectedTemplateId, loadingTemplates, templates } = this.state;
        const { squat, deadlift, bench, press } = this.state.trainingMaxes;

        const selectedTemplate = this.getSelectedTemplate();

        return (
            <div>
                <AppBar531 title="Begin Cycle" />
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={this.handleFormSubmission}
                >
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <TitleCard title="Training Maxes">
                                <TextField
                                    label="Squat TM"
                                    value={squat}
                                    name="squat"
                                    type="number"
                                    onChange={this.handleTrainingMaxChange}
                                    required
                                    error={!squat} />
                                <TextField
                                    label="Deadlift TM"
                                    value={deadlift}
                                    name="deadlift"
                                    type="number"
                                    onChange={this.handleTrainingMaxChange}
                                    required
                                    error={!deadlift} />
                                <TextField
                                    label="Bench Press TM"
                                    value={bench}
                                    name="bench"
                                    type="number"
                                    onChange={this.handleTrainingMaxChange}
                                    required
                                    error={!bench} />
                                <TextField
                                    label="Overhead Press TM"
                                    value={press}
                                    name="press"
                                    type="number"
                                    onChange={this.handleTrainingMaxChange}
                                    required
                                    error={!press} />
                            </TitleCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TitleCard title="Template">
                                <FormControl>
                                <InputLabel></InputLabel>
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
                                </FormControl>
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
                                                <FormControl key={o.name}>
                                                    <InputLabel htmlFor={o.name}>{o.name}</InputLabel>
                                                    <Select
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
                                        } else {
                                            return null;
                                        }
                                    })
                                )}
                            </TitleCard>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.submitContainer} justify="flex-end">
                        <Grid item xs={12}>
                            <Button
                                className={classes.submitButton}
                                variant="raised"
                                color="primary"
                                type="submit"
                                disabled={!this.formIsValid()}
                            >
                                Generate
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

BeginCycle.propTypes = {
    classes: PropTypes.object.isRequired
};

BeginCycle = withStyles(styles)(BeginCycle);
export { BeginCycle };