import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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
import { Redirect, Route, withRouter } from 'react-router-dom';
import { TemplatesService } from '../../services/api/templates/templates.service';
import { Cycle } from '../cycle/cycle.component';
import queryString from 'query-string';
import base64 from 'base-64';

const styles = theme => ({
  form: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
  }),
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
    this.setState({
      loadingTrainingMaxes: false,
      trainingMaxes: {
        press: 135,
        bench: 225,
        squat: 315,
        deadlift: 405,
      },
    });
  }

  loadTemplates() {
    TemplatesService.getTemplates().then(templates =>
      this.setState({
        loadingTemplates: false,
        templates,
        selectedTemplateId: templates[0]._id,
        options: this.getDefaultOptions(templates[0]),
      })
    );
  }

  getDefaultOptions(template) {
    return template.options.reduce(
      (acc, curr) => ({ ...acc, [curr.key]: curr.defaultValue }),
      {}
    );
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
    const selectedTemplateId = event.target.value;
    const template = this.state.templates.find(
      t => t._id === selectedTemplateId
    );
    this.setState({
      selectedTemplateId,
      options: this.getDefaultOptions(template),
    });
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
    return templates.find(t => t._id === selectedTemplateId);
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

      const queryParams = {
        squat,
        deadlift,
        bench,
        press,
        templateId,
        options: base64.encode(JSON.stringify(options)),
      };

      const queryParamsStr = queryString.stringify(queryParams);

      this.props.history.push(`/cycle?${queryParamsStr}`);
      return null;
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
                      <MenuItem key={t._id} value={t._id}>
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

            <Grid item xs={12} sm={6} md={3}>
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
        <Route exact path="/cycle" component={Cycle} />
      </div>
    );
  }
}

BeginCycle.propTypes = {
  classes: PropTypes.object.isRequired,
};

BeginCycle = withStyles(styles)(BeginCycle);
export { BeginCycle };
