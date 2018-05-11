import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from 'material-ui';
import { Grid } from 'material-ui';
import { UsersService } from '../../services/api/users/users.service';
import { TitleCard } from './components/titleCard.component';
import { Button } from 'material-ui';
import { FormControlLabel } from 'material-ui';
import { Switch } from 'material-ui';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  form: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
  }),
  submitContainer: {
    paddingTop: theme.spacing.unit * 2,
  },
  submitButton: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
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
        press: '',
      },

      loadingTemplates: true,
      templates: [],
      selectedTemplateId: 0,
      redirectToCyclePage: false,
      options: {},
    };

    this.loadTrainingMaxes = this.loadTrainingMaxes.bind(this);
    this.loadTemplates = this.loadTemplates.bind(this);
    this.handleTrainingMaxChange = this.handleTrainingMaxChange.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.updateOptionValue = this.updateOptionValue.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.getSelectedTemplate = this.getSelectedTemplate.bind(this);
  }

  componentDidMount() {
    this.loadTrainingMaxes();
    this.loadTemplates();
  }

  loadTrainingMaxes() {
    UsersService.getTrainingMaxes('current').then(trainingMaxes =>
      this.setState(prevState => ({
        loadingTrainingMaxes: false,
        trainingMaxes: {
          ...prevState.trainingMaxes,
          ...trainingMaxes,
        },
      }))
    );
  }

  loadTemplates() {
    const templates = [
      {
        id: 1,
        name: 'Forever BBB',
        description: [
          'Always a Leader template.',
          'Great for people loking to gain some muscle.',
          'Strength can be gained in younger lifters.',
          'Not a good option for athletes, true beginners and very advanced lifters.',
          '85% TM for most lifters, 90% for beginners.',
        ],
        options: [
          {
            key: 'daysPerWeek',
            displayText: 'Days Per Week',
            type: 'select',
            defaultValue: 3,
            values: [
              {
                displayText: '3',
                value: 3,
              },
              {
                displayText: '4',
                value: 4,
              },
            ],
          },
          {
            key: 'repScheme',
            displayText: 'Rep Scheme',
            type: 'select',
            defaultValue: '531',
            values: [
              {
                displayText: '5/3/1',
                value: '531',
              },
              {
                displayText: '3/5/1',
                value: '351',
              },
            ],
          },
          {
            key: 'dailyLifts',
            displayText: 'Lift Order',
            type: 'select',
            defaultValue: 'squat,deadlift,press,bench',
            values: [
              {
                displayText: 'Squat, Deadlift, Press, Bench',
                value: 'squat,deadlift,press,bench',
              },
              {
                displayText: 'Squat, Bench, Deadlift, Press',
                value: 'squat,bench,deadlift,press',
              },
            ],
          },
          {
            key: 'advanced',
            displayText: 'Advanced Intermediate?',
            type: 'boolean',
            defaultValue: false,
            helpText:
              'Advanced intermediate lifters need lower supplemental training max percentages.',
          },
        ],
      },
    ];

    this.setState({
      loadingTemplates: false,
      templates,
      selectedTemplateId: templates[0].id,
      options: templates[0].options.reduce(
        (acc, curr) => ({ ...acc, [curr.key]: curr.defaultValue }),
        {}
      ),
    });
  }

  handleTrainingMaxChange(event) {
    const { name: lift, value: weight } = event.target;

    this.setState(prevState => ({
      trainingMaxes: {
        ...prevState.trainingMaxes,
        [lift]: weight,
      },
    }));
  }

  handleTemplateChange(event) {
    this.setState({ selectedTemplateId: event.target.value, options: {} });
  }

  updateOptionValue(key, value) {
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        [key]: value,
      },
    }));
  }

  handleFormSubmission(event) {
    event.preventDefault();

    this.setState({
      redirectToCyclePage: true,
    });
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
    if (this.state.redirectToCyclePage) {
      const {
        trainingMaxes,
        selectedTemplateId: templateId,
        options,
      } = this.state;
      const { squat, deadlift, press, bench } = trainingMaxes;

      const state = {
        squat,
        deadlift,
        bench,
        press,
        templateId,
        options,
      };

      return (
        <Redirect
          to={{
            pathname: `/cycle`,
            state,
          }}
        />
      );
    }

    const { classes } = this.props;
    const {
      selectedTemplateId,
      loadingTemplates,
      loadingTrainingMaxes,
      templates,
      options,
    } = this.state;
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
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12} sm={6} md={3}>
              <TitleCard title="Training Maxes" loading={loadingTrainingMaxes}>
                <TextField
                  label="Squat TM"
                  value={squat}
                  name="squat"
                  type="number"
                  onChange={this.handleTrainingMaxChange}
                  required
                  error={!squat}
                />
                <TextField
                  label="Deadlift TM"
                  value={deadlift}
                  name="deadlift"
                  type="number"
                  onChange={this.handleTrainingMaxChange}
                  required
                  error={!deadlift}
                />
                <TextField
                  label="Bench Press TM"
                  value={bench}
                  name="bench"
                  type="number"
                  onChange={this.handleTrainingMaxChange}
                  required
                  error={!bench}
                />
                <TextField
                  label="Overhead Press TM"
                  value={press}
                  name="press"
                  type="number"
                  onChange={this.handleTrainingMaxChange}
                  required
                  error={!press}
                />
              </TitleCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TitleCard title="Template" loading={loadingTemplates}>
                <FormControl>
                  <InputLabel />
                  <Select
                    value={selectedTemplateId}
                    onChange={this.handleTemplateChange}
                    disabled={loadingTemplates}
                  >
                    {templates.map(t => (
                      <MenuItem key={t.id} value={t.id}>
                        {t.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <ul>
                  {selectedTemplate &&
                    selectedTemplate.description.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                </ul>
              </TitleCard>
            </Grid>

            <Grid item xs={12} md={3}>
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
                        <FormControl key={o.key}>
                          <InputLabel htmlFor={o.key}>
                            {o.displayText}
                          </InputLabel>
                          <Select
                            value={options[o.key]}
                            onChange={e =>
                              this.updateOptionValue(o.key, e.target.value)
                            }
                            inputProps={{ name: o.key }}
                          >
                            {o.values.map(v => (
                              <MenuItem key={v.value} value={v.value}>
                                {v.displayText}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      );
                    } else if (o.type === 'boolean') {
                      return (
                        <FormControlLabel
                          key={o.key}
                          control={
                            <Switch
                              checked={options[o.key]}
                              onChange={e =>
                                this.updateOptionValue(o.key, e.target.checked)
                              }
                              value={options[o.key].toString()}
                            />
                          }
                          label={o.displayText}
                        />
                      );
                    } else {
                      return null;
                    }
                  })
                )}
              </TitleCard>
            </Grid>
            <Grid item xs={12} align="center">
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
  classes: PropTypes.object.isRequired,
};

BeginCycle = withStyles(styles)(BeginCycle);
export { BeginCycle };
