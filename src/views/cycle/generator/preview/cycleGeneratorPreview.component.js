import { Button, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { default as React } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../../../context/authContext.component';
import Loading from '../../../../core/loading/loading.component';
import CyclesService from '../../../../services/api/cycles/cycles.service';
import UsersService from '../../../../services/api/users/users.service';
import SessionMetaGridContainer from '../../core/sessionMetaGrid.component';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

let CycleGeneratorPreview = props => {
  const { classes, cycle, isLoggedIn, onStartCycleClick } = props;

  return (
    <div>
      <SessionMetaGridContainer sessionMeta={cycle.sessionMeta} />
      {isLoggedIn && (
        <Tooltip title="Start Cycle" placement="left">
          <Button
            variant="fab"
            color="secondary"
            className={classes.fab}
            onClick={onStartCycleClick}
          >
            <CheckIcon />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

CycleGeneratorPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  cycle: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onStartCycleClick: PropTypes.func.isRequired,
};

CycleGeneratorPreview = withStyles(styles)(CycleGeneratorPreview);

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

    return CyclesService.createCycle(this.state.cycle).then(cycleId => {
      return UsersService.startCycle(cycleId).then(() => {
        // TODO:  Figure out how to get the "Current Cycle" link to appear
        // in the sidenav without a browser refresh.
        this.props.history.push(`/cycle/${cycleId}`);
      });
    });
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
            onStartCycleClick={() => this.handleStartCycleClick()}
          />
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(CycleGeneratorPreviewContainer);
