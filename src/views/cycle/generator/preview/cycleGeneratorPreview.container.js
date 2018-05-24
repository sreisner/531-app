import queryString from 'query-string';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../../../context/authContext.component';
import Loading from '../../../../core/loading/loading.component';
import CyclesService from '../../../../services/api/cycles/cycles.service';
import UsersService from '../../../../services/api/users/users.service';
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

  handleStartCycleClick = () => {
    this.setState({
      loading: true,
    });

    UsersService.startCycle('current', this.state.cycle).then(() =>
      this.props.history.push('/cycle/current')
    );
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <AuthConsumer>
        {({ user }) => (
          <CycleGeneratorPreview
            cycle={this.state.cycle}
            isLoggedIn={!!user}
            onStartCycleClick={this.handleStartCycleClick}
          />
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(CycleGeneratorPreviewContainer);
