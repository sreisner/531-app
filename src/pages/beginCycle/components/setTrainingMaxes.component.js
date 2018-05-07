import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({});

class SetTrainingMaxes extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.props.onChange(name, value);
    }

    render() {
        const { classes } = this.props;
        const { squat, deadlift, bench, press } = this.props.trainingMaxes;

        return (
            <div>
                <TextField
                    className={classes.input}
                    label="Squat TM"
                    value={squat}
                    name="squat"
                    type="number"
                    onChange={this.handleChange} />
                <TextField
                    className={classes.input}
                    label="Deadlift TM"
                    value={deadlift}
                    name="deadlift"
                    type="number"
                    onChange={this.handleChange} />
                <TextField
                    className={classes.input}
                    label="Bench Press TM"
                    value={bench}
                    name="bench"
                    type="number"
                    onChange={this.handleChange} />
                <TextField
                    className={classes.input}
                    label="Overhead Press TM"
                    value={press}
                    name="press"
                    type="number"
                    onChange={this.handleChange} />
            </div>
        );
    }
}

SetTrainingMaxes.propTypes = {
    classes: PropTypes.object.isRequired
};

SetTrainingMaxes = withStyles(styles)(SetTrainingMaxes);
export { SetTrainingMaxes };