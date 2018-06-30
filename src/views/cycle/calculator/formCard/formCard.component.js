import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  withStyles,
} from '@material-ui/core';
import React, { Component } from 'react';
import TemplatesService from '../../../../services/api/templates/templates.service';
import TemplateForm from './templateForm.component';
import TrainingMaxesForm from './trainingMaxesForm.component';

const styles = theme => ({
  card: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '25%',
    },
  },
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
      </Grid>
      {/* <OptionsForm /> */}
    </CardContent>
    <CardActions>
      <Button onClick={props.onSubmit} variant="contained" color="primary">
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

  onTemplateChange = templateId => {
    const template = this.getTemplate(templateId);

    this.setState({
      selectedTemplate: template,
      selectedVariant: {},
      optionsMeta: template.options,
      selectedOptionValues: this.getDefaultOptionValues(template.options),
    });
  };

  onVariantChange = variantId => {
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

  onSelectedOptionValueChange = (key, value) => {
    this.setState({
      selectedOptionValues: {
        ...this.state.selectedOptionValues,
        [key]: value,
      },
    });
  };

  onSubmit = () => {
    console.log('submitting form card');
  };

  componentDidMount() {
    this.loadTemplates();
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
      />
    );
  }
}

export default FormCardContainer;
