import base64 from 'base-64';
import queryString from 'query-string';
import React from 'react';
import { withRouter } from 'react-router-dom';
import TemplatesService from '../../../../services/api/templates/templates.service';
import UsersService from '../../../../services/api/users/users.service';
import CycleGeneratorForm from './cycleGeneratorForm.component';

class CycleGeneratorFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingCurrentCycle: false,
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
      this.props.user && this.loadCurrentCycle();
    });
  }

  loadCurrentCycle = userId => {
    this.setState({ loadingCurrentCycle: true });

    UsersService.getCurrentCycle().then(currentCycle => {
      if (currentCycle) {
        this.handleTemplateChange(currentCycle.templateId);
        this.handleVariantChange(currentCycle.variantId);
        this.setState({
          trainingMaxes: currentCycle.trainingMaxes,
          selectedOptionValues: currentCycle.options,
        });
      }
      this.setState({ loadingCurrentCycle: false });
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
    return this.state.loadingTemplates || this.state.loadingCurrentCycle;
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
