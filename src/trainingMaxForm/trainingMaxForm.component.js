import React from 'react';
import { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {};

class TrainingMaxForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squatTm: 315,
            deadliftTm: 405,
            overheadPressTm: 135,
            benchPressTm: 225
        };

        this.updateTm = this.updateTm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateTm(name) {
        return event => {
            this.setState({
                [name]: event.target.value
            });
        };
    }

    onSubmit(event) {
        this.props.onSubmit(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    label="Squat TM"
                    type="number"
                    value={this.state.squatTm}
                    onChange={this.updateTm('squatTm')} />
                <TextField
                    label="Deadlift TM"
                    type="number"
                    value={this.state.deadliftTm}
                    onChange={this.updateTm('deadliftTm')} />
                <TextField
                    label="Overhead Press TM"
                    type="number"
                    value={this.state.overheadPressTm}
                    onChange={this.updateTm('overheadPressTm')} />
                <TextField
                    label="Bench Press TM"
                    type="number"
                    value={this.state.benchPressTm}
                    onChange={this.updateTm('benchPressTm')} />
                <Button
                    color="primary"
                    variant="raised"
                    type="submit"
                    onClick={this.calculate}>
                    Calculate
                </Button>
            </form>
        );
    }
}

TrainingMaxForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrainingMaxForm);