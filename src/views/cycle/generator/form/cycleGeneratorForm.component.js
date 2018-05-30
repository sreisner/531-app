import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../../../core/loading/loading.component';
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

export default CycleGeneratorForm;
