import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../context/authContext.component';
import CycleCalculator from './calculator/cycleCalculator.component';
import CycleContainer from './cycle.component';
import CycleGeneratorRoutes from './generator/cycleGenerator.routes';
import SessionContainer from './session/session.component';

class CycleRoutes extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <AuthConsumer>
        {({ user }) => (
          <Switch>
            <Route
              exact
              path={`${match.url}/calculator`}
              component={CycleCalculator}
            />
            <Route
              exact
              path={`${match.url}/:cycleId`}
              render={() => <CycleContainer user={user} />}
            />
            <Route
              path={`${match.url}/generator`}
              component={CycleGeneratorRoutes}
            />
            <Route
              exact
              path={`${match.url}/:cycleId/session/:sessionId`}
              render={() => <SessionContainer user={user} />}
            />
          </Switch>
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(CycleRoutes);
