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
      loading: true,
    };
  }

  componentDidMount() {
    const { templateId, options, ...trainingMaxes } = this.props.location.state;

    CycleGenerator.generateCycle(templateId, trainingMaxes, options).then(
      cycle =>
        this.setState({
          loading: false,
          cycle,
        })
    );
  }

  render() {
    if (this.state.cycle) {
      console.log(this.state.cycle);
    }

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
