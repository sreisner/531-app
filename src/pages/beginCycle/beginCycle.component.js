import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { TrainingMaxesService } from '../../services/api/users/trainingMaxes/trainingMaxes.service';

const styles = theme => ({});

class BeginCycle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        TrainingMaxesService
            .getTrainingMaxes('current')
            .then(trainingMaxes => console.log(trainingMaxes));
    }

    render() {
        return (
            <div>
                <AppBar531 />
                <h1>Begin Cycle</h1>
            </div>
        );
    }
}

BeginCycle.propTypes = {
    classes: PropTypes.object.isRequired
};

BeginCycle = withStyles(styles)(BeginCycle);
export { BeginCycle };