import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { SessionContainer } from './session/session.component';

class CycleRoutes extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={`${match.url}/session/:sessionId`}
          component={SessionContainer}
        />
      </Switch>
    );
  }
}

export default withRouter(CycleRoutes);
