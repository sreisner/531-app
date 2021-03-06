import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  withStyles,
} from '@material-ui/core';
import base64 from 'base-64';
import queryString from 'query-string';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TemplatesService from '../../../../services/api/templates/templates.service';
import OptionsForm from './optionsForm.component';
import TemplateForm from './templateForm.component';
import TrainingMaxesForm from './trainingMaxesForm.component';

const styles = theme => ({
  card: {},
});

let FormCard = props => (
  <Card className={props.classes.card}>
    <CardContent>
      <Grid container direction="column" spacing={40}>
        <Grid item>
          <TrainingMaxesForm
            press={props.press}
            bench={props.bench}
            squat={props.squat}
            deadlift={props.deadlift}
            onChange={props.onTrainingMaxChange}
          />
        </Grid>
        <Grid item>
          <TemplateForm
            templates={props.templates}
            selectedTemplate={props.selectedTemplate}
            selectedVariant={props.selectedVariant}
            onTemplateChange={props.onTemplateChange}
            onVariantChange={props.onVariantChange}
          />
        </Grid>
        <Grid item>
          <OptionsForm
            optionsMeta={props.optionsMeta}
            onChange={props.onSelectedOptionValueChange}
            selectedOptionValues={props.selectedOptionValues}
          />
        </Grid>
        {/* Adds space between Options and Calculate button*/}
        <Grid item />
      </Grid>
    </CardContent>
    <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        onClick={props.onSubmit}
        variant="contained"
        color="primary"
        disabled={!props.formIsValid()}
      >
        Calculate
      </Button>
    </CardActions>
  </Card>
);

FormCard = withStyles(styles)(FormCard);

class FormCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      press: 135,
      bench: 225,
      squat: 315,
      deadlift: 405,
      selectedTemplate: {},
      selectedVariant: {},
      templates: [],
      optionsMeta: [],
      selectedOptionValues: {},
    };
  }

  loadTemplates = () => {
    return TemplatesService.getTemplates().then(templates =>
      this.setState({
        templates,
      })
    );
  };

  onTrainingMaxChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onTemplateChange = (templateId, callback) => {
    if (templateId !== this.state.selectedTemplate._id) {
      const template = this.getTemplate(templateId);

      this.setState(
        {
          selectedTemplate: template,
          selectedVariant: {},
          optionsMeta: template.options,
          selectedOptionValues: this.getDefaultOptionValues(template.options),
        },
        () => (callback ? callback() : null) // I am so sorry, I will atone for my sins
      );
    } else if (callback) {
      callback();
    }
  };

  onVariantChange = (variantId, callback) => {
    if (variantId !== this.state.selectedVariant.id) {
      const variant = this.getVariant(variantId);

      this.setState(
        {
          selectedVariant: this.getVariant(variantId),
          optionsMeta: [
            ...this.state.selectedTemplate.options,
            ...variant.options,
          ],
          selectedOptionValues: {
            ...this.getSelectedTemplateSelectedOptionValues(),
            ...this.getDefaultOptionValues(variant.options),
          },
        },
        () => (callback ? callback() : null) // I am so sorry, I will atone for my sins
      );
    } else if (callback) {
      callback();
    }
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

  onSelectedOptionValueChange = (key, value) => {
    this.setState({
      selectedOptionValues: {
        ...this.state.selectedOptionValues,
        [key]: value,
      },
    });
  };

  generateQueryParamsString = () => {
    const {
      squat,
      bench,
      press,
      deadlift,
      selectedTemplate,
      selectedVariant,
    } = this.state;

    const queryParams = {
      squat,
      bench,
      press,
      deadlift,
      templateId: selectedTemplate._id,
      variantId: selectedVariant.id,
      options: base64.encode(JSON.stringify(this.state.selectedOptionValues)),
    };

    return queryString.stringify(queryParams);
  };

  onSubmit = event => {
    event.preventDefault();

    const queryParamsStr = this.generateQueryParamsString();

    this.props.history.push(`${this.props.match.url}?${queryParamsStr}`);
  };

  formIsValid = () => {
    const {
      squat,
      bench,
      deadlift,
      press,
      selectedTemplate,
      selectedVariant,
    } = this.state;

    return (
      squat >= 0 &&
      bench >= 0 &&
      deadlift >= 0 &&
      press >= 0 &&
      selectedTemplate._id &&
      selectedVariant.id
    );
  };

  fillFormFromQueryParams = queryParams => {
    if (queryParams) {
      const {
        squat,
        bench,
        deadlift,
        press,
        templateId,
        variantId,
        options,
      } = queryString.parse(queryParams);

      console.log(squat);

      // Look away, nothing to see here
      this.setState(
        {
          squat,
          bench,
          deadlift,
          press,
        },
        () => {
          this.onTemplateChange(templateId, () =>
            this.onVariantChange(variantId, () =>
              this.setState({
                selectedOptionValues: JSON.parse(base64.decode(options)),
              })
            )
          );
        }
      );
    } else {
      this.setState({
        press: 135,
        bench: 225,
        squat: 315,
        deadlift: 405,
        selectedTemplate: {},
        selectedVariant: {},
        optionsMeta: [],
        selectedOptionValues: {},
      });
    }
  };

  componentDidMount() {
    this.loadTemplates().then(() =>
      this.fillFormFromQueryParams(this.props.location.search)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.fillFormFromQueryParams(nextProps.location.search);
    }
  }

  render() {
    const {
      squat,
      bench,
      press,
      deadlift,
      templates,
      selectedTemplate,
      selectedVariant,
      optionsMeta,
      selectedOptionValues,
    } = this.state;

    return (
      <FormCard
        squat={squat}
        bench={bench}
        press={press}
        deadlift={deadlift}
        templates={templates}
        selectedTemplate={selectedTemplate}
        selectedVariant={selectedVariant}
        optionsMeta={optionsMeta}
        selectedOptionValues={selectedOptionValues}
        onTrainingMaxChange={this.onTrainingMaxChange}
        onTemplateChange={this.onTemplateChange}
        onVariantChange={this.onVariantChange}
        onSelectedOptionValueChange={this.onSelectedOptionValueChange}
        onSubmit={this.onSubmit}
        formIsValid={this.formIsValid}
      />
    );
  }
}

export default withRouter(FormCardContainer);
