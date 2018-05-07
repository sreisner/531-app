import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Stepper, Step, StepLabel } from 'material-ui';

const styles = theme => ({});

class BeginCycleStepper extends React.Component {
    render() {
        const { classes, ...rest } = this.props;

        return (
            <Stepper className={classes.root} {...rest}>
                <Step key="tms">
                    <StepLabel>Set training maxes</StepLabel>
                </Step>
                <Step key="template">
                    <StepLabel>Choose template</StepLabel>
                </Step>
                <Step key="options">
                    <StepLabel>Select options</StepLabel>
                </Step>
            </Stepper>
        );
    }
}

BeginCycleStepper.propTypes = {
    classes: PropTypes.object.isRequired
};

BeginCycleStepper = withStyles(styles)(BeginCycleStepper);
export { BeginCycleStepper };