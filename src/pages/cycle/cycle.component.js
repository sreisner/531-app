import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { SessionGrid } from './components/sessionGrid.component';
import { Loading } from '../../core/loading/loading.component';
import { CyclesService } from '../../services/api/cycles/cycles.service';
import { UsersService } from '../../services/api/users/users.service';
import { Button, Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { AuthConsumer } from '../../context/authContext.component';

const styles = theme => ({
  grid: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    // TODO:  The following two rules override Material UIs CSS, which
    // means I'm probably not doing something right.  Try to figure out
    // what that might be
    width: '100%',
    margin: 0,
  }),
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

class Cycle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    CyclesService.generateCycle({
      ...queryString.parse(this.props.location.search),
    }).then(cycle =>
      this.setState({
        loading: false,
        cycle,
      })
    );
  }

  startCycle = () => {
    this.setState({
      loading: true,
    });

    UsersService.startCycle('current', this.state.cycle).then(() =>
      this.props.history.push('/cycle/current')
    );
  };

  render() {
    const { classes } = this.props;
    const { cycle, loading } = this.state;

    if (loading) {
      return <Loading variant="title" />;
    }

    return (
      <AuthConsumer>
        {({ isLoggedIn }) => (
          <div>
            <div className={classes.grid}>
              <SessionGrid cycle={cycle} />
            </div>
            {isLoggedIn && (
              <Tooltip title="Start Cycle" placement="left">
                <Button
                  variant="fab"
                  color="secondary"
                  className={classes.fab}
                  onClick={this.startCycle}
                  disabled={loading}
                >
                  <CheckIcon />
                </Button>
              </Tooltip>
            )}
          </div>
        )}
      </AuthConsumer>
    );
  }
}

Cycle.propTypes = {
  classes: PropTypes.object.isRequired,
};

Cycle = withStyles(styles)(Cycle);
export { Cycle };
