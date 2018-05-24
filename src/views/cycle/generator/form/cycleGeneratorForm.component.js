import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
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
      loadingTrainingMaxes,
      trainingMaxes,
      loadingTemplates,
      templates,
      selectedTemplate,
      selectedVariant,
      optionValues,
      formSubmissionIsEnabled,
      onFormSubmission,
      onTrainingMaxChange,
      onTemplateChange,
      onVariantChange,
      onOptionValueChange,
    } = this.props;

    return (
      <form className={classes.form} noValidate onSubmit={onFormSubmission}>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} sm={6} md={3}>
            <TrainingMaxesCard
              trainingMaxes={trainingMaxes}
              onChange={onTrainingMaxChange}
              loading={loadingTrainingMaxes}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TemplateCard
              loading={loadingTemplates}
              templates={templates}
              selectedTemplate={selectedTemplate}
              selectedVariant={selectedVariant}
              onTemplateChange={onTemplateChange}
              onVariantChange={onVariantChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <OptionsCard
              onChange={onOptionValueChange}
              selectedTemplate={selectedTemplate}
              selectedVariant={selectedVariant}
              optionValues={optionValues}
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
  loadingTrainingMaxes: PropTypes.bool.isRequired,
  loadingTemplates: PropTypes.bool.isRequired,
  trainingMaxes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  selectedTemplate: PropTypes.object.isRequired,
  selectedVariant: PropTypes.object.isRequired,
  optionValues: PropTypes.object.isRequired,
  formSubmissionIsEnabled: PropTypes.bool.isRequired,
  onFormSubmission: PropTypes.func.isRequired,
  onTemplateChange: PropTypes.func.isRequired,
  onVariantChange: PropTypes.func.isRequired,
  onOptionValueChange: PropTypes.func.isRequired,
};

CycleGeneratorForm = withStyles(styles)(CycleGeneratorForm);

export default CycleGeneratorForm;
