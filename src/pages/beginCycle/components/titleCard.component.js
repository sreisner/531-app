import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Paper, Typography, Grid } from 'material-ui';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 4,
        height: '100%'
    },
    inputContainer: {
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        width: '50%'
    }
});

class TitleCard extends React.Component {
    state = {};

    render() {
        const { classes, children, title } = this.props;

        return (
            <Paper className={classes.paper}>
                <Typography variant="title" gutterBottom={true}>
                    {title}
                </Typography>
                <Grid container direction="column" className={classes.inputContainer}>
                    {children}
                </Grid>
            </Paper>
        );
    }
}

TitleCard.propTypes = {
    classes: PropTypes.object.isRequired
};

TitleCard = withStyles(styles)(TitleCard);
export { TitleCard };