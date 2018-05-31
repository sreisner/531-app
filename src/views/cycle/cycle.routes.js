import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../context/authContext.component';
import CurrentCycleContainer from './current/currentCycle.container';
import CycleGeneratorRoutes from './generator/cycleGenerator.routes';

class CycleRoutes extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <AuthConsumer>
        {({ user }) => (
          <Switch>
            <Route
              path={`${match.url}/generator`}
              component={CycleGeneratorRoutes}
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

export default withRouter(CycleRoutes);
