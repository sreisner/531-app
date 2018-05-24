import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  card: {
    height: '100%',
    minHeight: 200,
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  cardContent: {
    position: 'relative',
    height: '100%',
  },
});

let TitleCard = props => {
  const { classes, children, title, loading } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="title" gutterBottom={true}>
          {title}
        </Typography>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          <div>
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
export default TitleCard;
