import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../../context/authContext.component';
import CycleGeneratorFormContainer from './form/cycleGeneratorForm.component';
import CycleGeneratorPreviewContainer from './preview/cycleGeneratorPreview.component';

class CycleGeneratorRoutes extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <AuthConsumer>
        {({ user }) => (
          <Switch>
            <Route
              exact
              path={`${match.url}/form`}
              render={() => <CycleGeneratorFormContainer user={user} />}
            />
            <Route
              exact
              path={`${match.url}/preview`}
              component={CycleGeneratorPreviewContainer}
            />
          </Switch>
        )}
      </AuthConsumer>
    );
  }
}

CycleGeneratorRoutes = withRouter(CycleGeneratorRoutes);
export default CycleGeneratorRoutes;
