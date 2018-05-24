import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CurrentCycleContainer from './current/currentCycle.container';
import CycleGeneratorContainer from './generator/cycleGenerator.container';

class CycleContainer extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          path={`${match.url}/generator`}
          component={CycleGeneratorContainer}
        />
        <Route
          path={`${match.url}/current`}
          component={CurrentCycleContainer}
        />
      </Switch>
    );
  }
}

export default withRouter(CycleContainer);
