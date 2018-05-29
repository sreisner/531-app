import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  card: {
    height: '100%',
    minHeight: 200,
  },
  cardContent: {
    position: 'relative',
    height: '100%',
  },
});

let TitleCard = props => {
  const { classes, children, title } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="title" gutterBottom={true}>
          {title}
        </Typography>
        <div>
          <Grid container direction="column" className={classes.inputContainer}>
            {children}
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

TitleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

TitleCard = withStyles(styles)(TitleCard);
export default TitleCard;
