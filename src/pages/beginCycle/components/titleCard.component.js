import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import { Typography, Grid, CircularProgress } from 'material-ui';

const styles = theme => ({
  card: {
    height: '100%',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

let TitleCard = props => {
  const { classes, children, title, loading } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

TitleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

TitleCard = withStyles(styles)(TitleCard);
export { TitleCard };
