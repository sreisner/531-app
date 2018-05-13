import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CycleGenerator from './cycleGenerator.service';
import queryString from 'query-string';
import { SessionGrid } from './components/sessionGrid.component';
// import { Button, Tooltip } from 'material-ui';
// import AdjustIcon from '@material-ui/icons/Adjust';
// import CheckIcon from '@material-ui/icons/Check';

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
    const {
      templateId,
      variantId,
      options,
      ...trainingMaxes
    } = queryString.parse(this.props.location.search);

    CycleGenerator.generateCycle(
      templateId,
      variantId,
      trainingMaxes,
      options
    ).then(cycle =>
      this.setState({
        loading: false,
        cycle,
      })
    );
  }

  render() {
    const { classes } = this.props;
    const { cycle } = this.state;

    if (!cycle) {
      return null;
    }

    return (
      <div>
        <div className={classes.grid}>
          <SessionGrid cycle={cycle} />
        </div>
        {/* <Tooltip title="Start Cycle" placement="left">
          <Button variant="fab" color="secondary" className={classes.fab}>
            <CheckIcon />
          </Button>
        </Tooltip> */}
      </div>
    );
  }
}

Cycle.propTypes = {
  classes: PropTypes.object.isRequired,
};

Cycle = withStyles(styles)(Cycle);
export { Cycle };
