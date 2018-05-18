import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import base64 from 'base-64';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { UsersService } from '../../services/api/users/users.service';
import { TemplatesService } from '../../services/api/templates/templates.service';
import { TrainingMaxesCard } from './components/trainingMaxesCard.component';
import { TemplateCard } from './components/templateCard.component';
import { OptionsCard } from './components/optionsCard.component';

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

class CycleGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingTrainingMaxes: true,
      loadingTemplates: true,
      trainingMaxes: {
        squat: '315',
        deadlift: '405',
        bench: '225',
        press: '135',
      },

      templates: [],
      selectedTemplate: {},
      selectedVariant: {},

      templateOptionValues: {},
      variantOptionValues: {},
    };
  }

  componentDidMount() {
    this.loadTrainingMaxes();
    this.loadTemplates();
  }

  loadTrainingMaxes = () => {
    UsersService.getTrainingMaxes('current').then(trainingMaxes => {
      this.setState(prevState => ({
        loadingTrainingMaxes: false,
        trainingMaxes: {
          ...prevState.trainingMaxes,
          ...trainingMaxes,
        },
      }));
    });
  };

  handleTrainingMaxChange = event => {
    const { name: lift, value: weight } = event.target;

    this.setState(prevState => ({
      trainingMaxes: {
        ...prevState.trainingMaxes,
        [lift]: weight,
      },
    }));
  };

  loadTemplates = () => {
    TemplatesService.getTemplates().then(templates =>
      this.setState({
        templates,
        loadingTemplates: false,
      })
    );
  };

  handleTemplateChange = templateId => {
    const template = this.getTemplate(templateId);

    this.setState({
      selectedTemplate: template,
      selectedVariant: 0,
      templateOptionValues: this.getDefaultOptionValues(template.options),
    });
  };

  handleVariantChange = variantId => {
    const variant = this.getVariant(variantId);

    this.setState(prevState => ({
      selectedVariant: this.getVariant(variantId),
      variantOptionValues: this.getDefaultOptionValues(variant.options),
    }));
  };

  getTemplate = templateId => {
    return this.state.templates.find(t => t._id === templateId);
  };

  getVariant = variantId => {
    return this.state.selectedTemplate.variants.find(v => v.id === variantId);
  };

  getDefaultOptionValues = optionsMeta => {
    return optionsMeta.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.key]: curr.defaultValue,
      }),
      {}
    );
  };

  getAllOptionValues = () => {
    const { templateOptionValues, variantOptionValues } = this.state;
    return { ...templateOptionValues, ...variantOptionValues };
  };

  updateOptionValue = (key, value) => {
    // TODO:  This logic makes me think there's an issue with the
    // underlying structure of the data within this component
    if (this.state.templateOptionValues[key] !== undefined) {
      this.setState(prevState => ({
        templateOptionValues: {
          ...prevState.templateOptionValues,
          [key]: value,
        },
      }));
    } else if (this.state.variantOptionValues[key] !== undefined) {
      this.setState(prevState => ({
        variantOptionValues: {
          ...prevState.variantOptionValues,
          [key]: value,
        },
      }));
    }
  };

  formSubmissionIsEnabled = () => {
    const {
      loadingTrainingMaxes,
      loadingTemplates,
      selectedTemplate,
      selectedVariant,
    } = this.state;

    return (
      !loadingTrainingMaxes &&
      !loadingTemplates &&
      selectedTemplate._id &&
      selectedVariant.id
    );
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { trainingMaxes, selectedTemplate, selectedVariant } = this.state;

    const queryParams = {
      ...trainingMaxes,
      templateId: selectedTemplate._id,
      variantId: selectedVariant.id,
      options: base64.encode(JSON.stringify(this.getAllOptionValues())),
    };

    const queryParamsStr = queryString.stringify(queryParams);

    UsersService.updateTrainingMaxes('current', trainingMaxes);

    this.props.history.push(`/cycle?${queryParamsStr}`);
  };

  render() {
    const { classes } = this.props;
    const {
      loadingTrainingMaxes,
      trainingMaxes,
      loadingTemplates,
      templates,
      selectedTemplate,
      selectedVariant,
    } = this.state;

    return (
      <div>
        <form
          className={classes.form}
          noValidate
          onSubmit={this.handleFormSubmission}
        >
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12} sm={6} md={3}>
              <TrainingMaxesCard
                trainingMaxes={trainingMaxes}
                onChange={this.handleTrainingMaxChange}
                loading={loadingTrainingMaxes}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TemplateCard
                loading={loadingTemplates}
                templates={templates}
                selectedTemplate={selectedTemplate}
                selectedVariant={selectedVariant}
                onTemplateChange={this.handleTemplateChange}
                onVariantChange={this.handleVariantChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <OptionsCard
                onChange={this.updateOptionValue}
                selectedTemplate={selectedTemplate}
                selectedVariant={selectedVariant}
                optionValues={this.getAllOptionValues()}
              />
            </Grid>

            <Grid item xs={12} align="center">
              <Button
                className={classes.submitButton}
                variant="raised"
                color="secondary"
                type="submit"
                disabled={!this.formSubmissionIsEnabled()}
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

CycleGenerator.propTypes = {
  classes: PropTypes.object.isRequired,
};

CycleGenerator = withStyles(styles)(CycleGenerator);
export { CycleGenerator };
