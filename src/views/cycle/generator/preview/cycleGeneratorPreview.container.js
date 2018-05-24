import queryString from 'query-string';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from '../../../../core/loading/loading.component';
import CyclesService from '../../../../services/api/cycles/cycles.service';
import CycleGeneratorPreview from './cycleGeneratorPreview.component';

class CycleGeneratorPreviewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cycle: {},
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      CyclesService.generateCycle({
        ...queryString.parse(this.props.location.search),
      }).then(cycle =>
        this.setState({
          loading: false,
          cycle,
        })
      );
    } else {
      this.props.history.replace('/cycle/generator/form');
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return <CycleGeneratorPreview cycle={this.state.cycle} />;
  }
}

export default withRouter(CycleGeneratorPreviewContainer);
