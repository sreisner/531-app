import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';
import { Grid } from 'material-ui';
import { CardContent, CardHeader } from 'material-ui';
import { Typography, Divider } from 'material-ui';

const styles = theme => ({
  lift: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  card: {
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
  cardParentList: {
    paddingLeft: 0,
  },
});

let SessionGrid = ({ classes, cycle }) => {
  const { push, pull, abs } = cycle.assistance;

  return cycle.weeklySessions.map((week, i) => (
    <Grid
      key={i}
      container
      className={classes.grid}
      justify="center"
      spacing={16}
    >
      {week.sessions.map((session, j) => (
        <Grid key={j} item className={classes.cardContainer} xs={12} sm={6} lg>
          <Card className={classes.card}>
            <CardHeader title={`Week ${i + 1}, Session ${j + 1}`} />
            <Divider />
            <CardContent>
              <ul className={classes.cardParentList}>
                <Typography variant="subheading" gutterBottom={true}>
                  Warmup/Mobility
                </Typography>
                <Typography variant="subheading" gutterBottom={true}>
                  Jumps/Throws ({cycle.jumpsThrows})
                </Typography>
                <Typography variant="subheading" gutterBottom={true}>
                  Lifts
                </Typography>
                <ul>
                  {session.sets.map((set, k) => (
                    <Typography key={k} variant="body1">
                      <span className={classes.lift}>{set.lift}</span>:{' '}
                      {set.sets}x{set.reps}@{set.weight}lbs
                    </Typography>
                  ))}
                </ul>
                <Typography variant="subheading" gutterBottom={true}>
                  Assistance
                </Typography>
                <ul>
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
                </ul>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  ));
};

SessionGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  cycle: PropTypes.object.isRequired,
};

SessionGrid = withStyles(styles)(SessionGrid);
export { SessionGrid };
