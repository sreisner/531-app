import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../../context/authContext.component';
import CycleGeneratorFormContainer from './form';
import CycleGeneratorPreviewContainer from './preview/cycleGeneratorPreview.container';

class CycleGeneratorContainer extends React.Component {
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

CycleGeneratorContainer = withRouter(CycleGeneratorContainer);
export default CycleGeneratorContainer;
