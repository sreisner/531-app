import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import CycleGenerator from './cycleGenerator.service';

const styles = theme => ({});

class Cycle extends React.Component {
  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    const templateId = queryParams.templateId;

    const trainingMaxes = {
      squat: queryParams.squat,
      deadlift: queryParams.deadlift,
      bench: queryParams.bench,
      press: queryParams.press,
    };

    const options = JSON.parse(queryParams.options);

    console.log(
      JSON.stringify(
        CycleGenerator.generateCycle(templateId, trainingMaxes, options),
        null,
        4
      )
    );
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
