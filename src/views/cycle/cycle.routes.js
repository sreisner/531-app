import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../context/authContext.component';
import CycleCalculator from './calculator/cycleCalculator.component';

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
          </Switch>
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(CycleRoutes);
