import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../context/authContext.component';
import CurrentCycleContainer from './current/currentCycle.container';
import CycleGeneratorContainer from './generator/cycleGenerator.routes';

class CycleContainer extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <AuthConsumer>
        {({ user }) => (
          <Switch>
            <Route
              path={`${match.url}/generator`}
              component={CycleGeneratorContainer}
            />
            <Route
              path={`${match.url}/current`}
              render={() => <CurrentCycleContainer user={user} />}
            />
          </Switch>
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(CycleContainer);
