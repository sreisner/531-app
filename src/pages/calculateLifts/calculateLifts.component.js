import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { TrainingMaxesService } from '../../services/api/users/trainingMaxes/trainingMaxes.service';

const styles = theme => ({});

class CalculateLifts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const { userId } = this.props;

        TrainingMaxesService
            .getTrainingMaxes(userId)
            .then(trainingMaxes => console.log(trainingMaxes));
    }

    render() {
        return (
            <div>
                <AppBar531 />
                <h1>Calculate Lifts</h1>
            </div>
        );
    }
}

CalculateLifts.propTypes = {
    classes: PropTypes.object.isRequired
};

CalculateLifts = withStyles(styles)(CalculateLifts);
export { CalculateLifts };