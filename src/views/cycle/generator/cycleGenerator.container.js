import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CycleGeneratorFormContainer from './form';
import cycleGeneratorPreviewContainer from './preview/cycleGeneratorPreview.container';

class CycleGeneratorContainer extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={`${match.url}/form`}
          component={CycleGeneratorFormContainer}
        />
        <Route
          exact
          path={`${match.url}/preview`}
          component={cycleGeneratorPreviewContainer}
        />
      </Switch>
    );
  }
}

CycleGeneratorContainer = withRouter(CycleGeneratorContainer);
export default CycleGeneratorContainer;
