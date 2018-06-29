import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  withStyles,
} from '@material-ui/core';
import React, { Component } from 'react';
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
            onChange={props.onChange}
          />
        </Grid>
        <Grid item>
          <TemplateForm
            selectedTemplate={props.selectedTemplate}
            selectedVariant={props.selectedVariant}
            onTemplateChange={props.onChange}
            onVariantChange={props.onChange}
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
    };
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    console.log('submitting form card');
  };

  render() {
    return (
      <FormCard
        squat={this.state.squat}
        bench={this.state.bench}
        press={this.state.press}
        deadlift={this.state.deadlift}
        selectedTemplate={this.state.selectedTemplate}
        selectedVariant={this.state.selectedVariant}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default FormCardContainer;
