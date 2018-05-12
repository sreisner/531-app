import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Typography, Divider } from 'material-ui';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import CycleGenerator from './cycleGenerator.service';
import queryString from 'query-string';
import Card from 'material-ui/Card';
import { Grid } from 'material-ui';
import { CardContent, CardHeader } from 'material-ui';

const styles = theme => ({
  grid: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    // TODO:  The following two rules override Material UIs CSS, which
    // means I'm probably not doing something right.  Try to figure out
    // what that might be
    width: '100%',
    margin: 0,
  }),
  lift: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  cardContainer: {
    flexGrow: 1,
    maxWidth: 400,
  },
  card: {
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
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
    const { templateId, options, ...trainingMaxes } = queryString.parse(
      this.props.location.search
    );

    CycleGenerator.generateCycle(templateId, trainingMaxes, options).then(
      cycle =>
        this.setState({
          loading: false,
          cycle,
        })
    );
  }

  render() {
    const { classes } = this.props;
    const { cycle } = this.state;

    let cycleUI = null;
    if (cycle) {
      const { push, pull, abs } = cycle.assistance;
      cycleUI = cycle.weeklySessions.map((week, i) => (
        <Grid
          key={i}
          container
          className={classes.grid}
          justify="center"
          spacing={16}
        >
          {week.sessions.map((session, j) => (
            <Grid key={j} item className={classes.cardContainer}>
              <Card className={classes.card}>
                <CardHeader title={`Week ${i + 1}, Session ${j + 1}`} />
                <CardContent>
                  <Typography variant="subheading" gutterBottom={true}>
                    Warmup/Mobility
                  </Typography>
                  <Divider light={true} />
                  <Typography variant="subheading" gutterBottom={true}>
                    Jumps/Throws ({cycle.jumpsThrows})
                  </Typography>
                  <Divider light={true} />
                  <Typography variant="subheading" gutterBottom={true}>
                    Lifts
                  </Typography>
                  {session.sets.map((set, k) => (
                    <Typography key={k} variant="body1">
                      <span className={classes.lift}>{set.lift}</span>:{' '}
                      {set.sets}x{set.reps}@{set.weight}lbs
                    </Typography>
                  ))}
                  <Divider light={true} />
                  <Typography variant="subheading" gutterBottom={true}>
                    Assistance
                  </Typography>
                  <Typography variant="body1">
                    <span className={classes.bold}>Push</span>: {push.minReps} -{' '}
                    {push.maxReps}
                  </Typography>
                  <Typography variant="body1">
                    <span className={classes.bold}>Pull</span>: {pull.minReps} -{' '}
                    {pull.maxReps}
                  </Typography>
                  <Typography variant="body1">
                    <span className={classes.bold}>Abs/Single Leg</span>:{' '}
                    {abs.minReps} - {abs.maxReps}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ));
    }

    return (
      <div>
        <AppBar531 title="Cycle" />
        {cycleUI}
      </div>
    );
  }
}

Cycle.propTypes = {
  classes: PropTypes.object.isRequired,
};

Cycle = withStyles(styles)(Cycle);
export { Cycle };
