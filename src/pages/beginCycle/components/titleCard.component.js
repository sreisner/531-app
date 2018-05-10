import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Paper, Typography, Grid, CircularProgress } from 'material-ui';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 4,
    height: '100%',
  },
  inputContainer: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.only('sm')]: {
      width: '61%',
    },
    [theme.breakpoints.only('md')]: {
      width: '100%',
    },
    width: '61%',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class TitleCard extends React.Component {
  state = {};

  render() {
    const { classes, children, title, loading } = this.props;

    return (
      <Paper className={classes.paper} square={true} elevation={1}>
        {loading ? (
          <div className={classes.loading}>
            <Typography variant="title">Loading...</Typography>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Typography variant="title" gutterBottom={true}>
              {title}
            </Typography>
            <Grid
              container
              direction="column"
              className={classes.inputContainer}
            >
              {children}
            </Grid>
          </div>
        )}
      </Paper>
    );
  }
}

TitleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

TitleCard = withStyles(styles)(TitleCard);
export { TitleCard };
