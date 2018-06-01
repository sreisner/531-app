import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import base64 from 'base-64';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { default as React } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from '../../../../core/loading/loading.component';
import CyclesService from '../../../../services/api/cycles/cycles.service';
import TemplatesService from '../../../../services/api/templates/templates.service';
import { OptionsCard, TemplateCard, TrainingMaxesCard } from './cards';

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

class CycleGeneratorForm extends React.Component {
  render() {
    const {
      classes,
      loading,
      trainingMaxes,
      templates,
      selectedTemplate,
      selectedVariant,
      optionsMeta,
      selectedOptionValues,
      formSubmissionIsEnabled,
      onFormSubmission,
      onTrainingMaxChange,
      onTemplateChange,
      onVariantChange,
      onSelectedOptionValueChange,
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <form className={classes.form} noValidate onSubmit={onFormSubmission}>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} sm={6} md={3}>
            <TrainingMaxesCard
              trainingMaxes={trainingMaxes}
              onChange={onTrainingMaxChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TemplateCard
              templates={templates}
              selectedTemplate={selectedTemplate}
              selectedVariant={selectedVariant}
              onTemplateChange={onTemplateChange}
              onVariantChange={onVariantChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <OptionsCard
              onChange={onSelectedOptionValueChange}
              optionsMeta={optionsMeta}
              selectedOptionValues={selectedOptionValues}
            />
          </Grid>

          <Grid item xs={12} align="center">
            <Button
              className={classes.submitButton}
              variant="raised"
              color="secondary"
              type="submit"
              disabled={!formSubmissionIsEnabled}
            >
              Generate
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

CycleGeneratorForm.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  trainingMaxes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  selectedTemplate: PropTypes.object.isRequired,
  selectedVariant: PropTypes.object.isRequired,
  selectedOptionValues: PropTypes.object.isRequired,
  formSubmissionIsEnabled: PropTypes.bool.isRequired,
  onFormSubmission: PropTypes.func.isRequired,
  onTemplateChange: PropTypes.func.isRequired,
  onVariantChange: PropTypes.func.isRequired,
  onSelectedOptionValueChange: PropTypes.func.isRequired,
};

CycleGeneratorForm = withStyles(styles)(CycleGeneratorForm);

class CycleGeneratorFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingLastKnownCycle: false,
      loadingTemplates: true,
      trainingMaxes: {
        squat: 315,
        deadlift: 405,
        bench: 225,
        press: 135,
      },

      templates: [],
      selectedTemplate: {},
      selectedVariant: {},

      optionsMeta: [],
      selectedOptionValues: {},
    };
  }

  componentDidMount() {
    this.loadTemplates().then(() => {
      this.loadLastKnownCycle();
    });
  }

  loadLastKnownCycle = () => {
    const { user } = this.props;

    if (!user) {
      return;
    }

    const cycleId = user.currentCycleId || user.previousCycleIds[0];

    if (cycleId) {
      this.setState({ loadingLastKnownCycle: true });

      CyclesService.getCycle(cycleId).then(cycle => {
        this.handleTemplateChange(cycle.templateId);
        this.handleVariantChange(cycle.variantId);
        this.setState({
          trainingMaxes: cycle.trainingMaxes,
          selectedOptionValues: cycle.options,
        });
        this.setState({ loadingLastKnownCycle: false });
      });
    }
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
    return TemplatesService.getTemplates().then(templates =>
      this.setState({
        loadingTemplates: false,
        templates,
      })
    );
  };

  handleTemplateChange = templateId => {
    const template = this.getTemplate(templateId);

    this.setState({
      selectedTemplate: template,
      selectedVariant: {},
      optionsMeta: template.options,
      selectedOptionValues: this.getDefaultOptionValues(template.options),
    });
  };

  handleVariantChange = variantId => {
    const variant = this.getVariant(variantId);

    this.setState({
      selectedVariant: this.getVariant(variantId),
      optionsMeta: [...this.state.selectedTemplate.options, ...variant.options],
      selectedOptionValues: {
        ...this.getSelectedTemplateSelectedOptionValues(),
        ...this.getDefaultOptionValues(variant.options),
      },
    });
  };

  getSelectedTemplateSelectedOptionValues = () => {
    return this.state.selectedTemplate.options.reduce((acc, curr) => {
      acc[curr.key] = this.state.selectedOptionValues[curr.key];
      return acc;
    }, {});
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

  handleSelectedOptionValueChange = (key, value) => {
    this.setState({
      selectedOptionValues: {
        ...this.state.selectedOptionValues,
        [key]: value,
      },
    });
  };

  formSubmissionIsEnabled = () => {
    const { selectedTemplate, selectedVariant } = this.state;

    return !!(!this.isLoading() && selectedTemplate._id && selectedVariant.id);
  };

  isLoading = () => {
    return this.state.loadingTemplates || this.state.loadingLastKnownCycle;
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { trainingMaxes, selectedTemplate, selectedVariant } = this.state;

    const queryParams = {
      ...trainingMaxes,
      templateId: selectedTemplate._id,
      variantId: selectedVariant.id,
      options: base64.encode(JSON.stringify(this.state.selectedOptionValues)),
    };

    const queryParamsStr = queryString.stringify(queryParams);

    this.props.history.push(`/cycle/generator/preview?${queryParamsStr}`);
  };

  render() {
    const {
      trainingMaxes,
      templates,
      selectedTemplate,
      selectedVariant,
      optionsMeta,
      selectedOptionValues,
    } = this.state;

    const formSubmissionIsEnabled = this.formSubmissionIsEnabled();

    return (
      <CycleGeneratorForm
        loading={this.isLoading()}
        trainingMaxes={trainingMaxes}
        templates={templates}
        selectedTemplate={selectedTemplate}
        selectedVariant={selectedVariant}
        optionsMeta={optionsMeta}
        selectedOptionValues={selectedOptionValues}
        formSubmissionIsEnabled={formSubmissionIsEnabled}
        onFormSubmission={this.handleFormSubmission}
        onTrainingMaxChange={this.handleTrainingMaxChange}
        onTemplateChange={this.handleTemplateChange}
        onVariantChange={this.handleVariantChange}
        onSelectedOptionValueChange={this.handleSelectedOptionValueChange}
      />
    );
  }
}

export default withRouter(CycleGeneratorFormContainer);
