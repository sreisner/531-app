import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import CycleGenerator from './cycleGenerator.service';

const styles = theme => ({});

class Cycle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cycle: {},
    };
  }

  componentDidMount() {
    const {
      templateId,
      squat,
      deadlift,
      bench,
      press,
      ...options
    } = this.props.location.state;

    const trainingMaxes = {
      squat,
      deadlift,
      bench,
      press,
    };

    this.setState({
      cycle: CycleGenerator.generateCycle(templateId, trainingMaxes, options),
    });

    console.log(this.state.cycle);
  }

  render() {
    return (
      <div>
        <AppBar531 title="Cycle" />
      </div>
    );
  }
}

Cycle.propTypes = {
  classes: PropTypes.object.isRequired,
};

Cycle = withStyles(styles)(Cycle);
export { Cycle };
