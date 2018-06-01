import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { default as React } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from '../../core/loading/loading.component';
import CyclesService from '../../services/api/cycles/cycles.service';
import SessionGridContainer from './core/sessionGrid.component';

const styles = theme => ({});

let Cycle = props => (
  <div>
    <SessionGridContainer sessions={props.cycle.sessions} />
  </div>
);

Cycle.propTypes = {
  classes: PropTypes.object.isRequired,
  cycle: PropTypes.object.isRequired,
};

Cycle = withStyles(styles)(Cycle);

class CycleContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const cycleId = this.props.match.params.cycleId;

    this.setState({ loading: true });

    CyclesService.getCycle(cycleId).then(cycle => {
      this.setState({ loading: false, cycle });
    });
  }

  goToGeneratorForm = () => {
    this.props.history.push('/cycle/generator/form');
  };

  render() {
    const { cycle, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (!cycle) {
      this.goToGeneratorForm();
      return null;
    }

    return <Cycle cycle={cycle} />;
  }
}

export default withRouter(CycleContainer);
