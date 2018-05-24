import base64 from 'base-64';
import queryString from 'query-string';
import React from 'react';
import TemplatesService from '../../../../services/api/templates/templates.service';
import UsersService from '../../../../services/api/users/users.service';
import CycleGeneratorForm from './cycleGeneratorForm.component';

export default class CycleGeneratorFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingTrainingMaxes: true,
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
      selectedVariant: {},
      templateOptionValues: this.getDefaultOptionValues(template.options),
    });
  };

  handleVariantChange = variantId => {
    const variant = this.getVariant(variantId);

    this.setState({
      selectedVariant: this.getVariant(variantId),
      variantOptionValues: this.getDefaultOptionValues(variant.options),
    });
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

  handleOptionValueChange = (key, value) => {
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

    return !!(
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

    this.props.history.push(`/cycle/generator/preview?${queryParamsStr}`);
  };

  render() {
    const {
      loadingTrainingMaxes,
      loadingTemplates,
      trainingMaxes,
      templates,
      selectedTemplate,
      selectedVariant,
    } = this.state;

    const optionValues = this.getAllOptionValues();
    const formSubmissionIsEnabled = this.formSubmissionIsEnabled();

    return (
      <CycleGeneratorForm
        loadingTrainingMaxes={loadingTrainingMaxes}
        loadingTemplates={loadingTemplates}
        trainingMaxes={trainingMaxes}
        templates={templates}
        selectedTemplate={selectedTemplate}
        selectedVariant={selectedVariant}
        optionValues={optionValues}
        formSubmissionIsEnabled={formSubmissionIsEnabled}
        onFormSubmission={this.handleFormSubmission}
        onTrainingMaxChange={this.handleTrainingMaxChange}
        onTemplateChange={this.handleTemplateChange}
        onVariantChange={this.handleVariantChange}
        onOptionValueChange={this.handleOptionValueChange}
      />
    );
  }
}
