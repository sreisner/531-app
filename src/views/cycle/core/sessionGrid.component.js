import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Component, default as React } from 'react';
import { withRouter } from 'react-router-dom';
import CyclesService from '../../../services/api/cycles/cycles.service';

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
  grid: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    // TODO:  The following two rules override Material UIs CSS, which
    // means I'm probably not doing something right.  Try to figure out
    // what that might be
    width: '100%',
    margin: 0,
  }),
  beginSessionButton: {
    width: '100%',
  },
});

const getArrayOfWeeklySessionArrays = sessions => {
  return sessions.reduce((acc, session) => {
    const week = session.week;

    if (!acc[week]) {
      acc[week] = [session];
    } else {
      acc[week].push(session);
    }

    return acc;
  }, []);
};

let SessionGrid = ({ classes, sessions, onBeginSessionClick }) => {
  return getArrayOfWeeklySessionArrays(sessions).map((week, i) => (
    <Grid
      key={i}
      container
      className={classes.grid}
      justify="center"
      spacing={16}
    >
      {week.map((session, j) => {
        const { push, pull, abs } = session.assistance;
        return (
          <Grid
            key={j}
            item
            className={classes.cardContainer}
            xs={12}
            sm={6}
            lg
          >
            <Card className={classes.card}>
              <CardHeader
                title={`Week ${session.week}, Session ${session.day}`}
              />
              <Divider />
              <CardContent>
                <ul className={classes.cardParentList}>
                  <Typography variant="subheading" gutterBottom={true}>
                    Warmup/Mobility
                  </Typography>
                  <Typography variant="subheading" gutterBottom={true}>
                    Jumps/Throws ({session.jumpsThrows})
                  </Typography>
                  <Typography variant="subheading" gutterBottom={true}>
                    Lifts
                  </Typography>
                  <ul>
                    {session.sets.map((set, k) => (
                      <Typography key={k} variant="body1">
                        <span className={classes.lift}>{set.lift}</span>:{' '}
                        {set.numSets}x{set.numReps}@{set.weight}lbs
                      </Typography>
                    ))}
                  </ul>
                  <Typography variant="subheading" gutterBottom={true}>
                    Assistance
                  </Typography>
                  <ul>
                    <Typography variant="body1">
                      <span className={classes.bold}>Push</span>: {push.minReps}{' '}
                      - {push.maxReps}
                    </Typography>
                    <Typography variant="body1">
                      <span className={classes.bold}>Pull</span>: {pull.minReps}{' '}
                      - {pull.maxReps}
                    </Typography>
                    <Typography variant="body1">
                      <span className={classes.bold}>Abs/Single Leg</span>:{' '}
                      {abs.minReps} - {abs.maxReps}
                    </Typography>
                  </ul>
                </ul>
              </CardContent>
              {session.isComplete === false &&
                session.inProgress === false && (
                  <CardActions>
                    <Button
                      variant="raised"
                      color="secondary"
                      className={classes.beginSessionButton}
                      onClick={e => onBeginSessionClick(session._id)}
                    >
                      Begin Session
                    </Button>
                  </CardActions>
                )}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  ));
};

SessionGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  sessions: PropTypes.array.isRequired,
};

SessionGrid = withStyles(styles)(SessionGrid);

class SessionGridContainer extends Component {
  handleBeginSessionClick = sessionId => {
    const { history, match } = this.props;
    const { cycleId } = match.params;

    CyclesService.beginSession(cycleId, sessionId).then(() =>
      history.push(`${match.url}/session/${sessionId}`)
    );
  };

  render() {
    return (
      <SessionGrid
        sessions={this.props.sessions}
        onBeginSessionClick={this.handleBeginSessionClick}
      />
    );
  }
}

export default withRouter(SessionGridContainer);
