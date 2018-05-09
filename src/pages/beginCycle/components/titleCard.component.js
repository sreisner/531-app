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
        [theme.breakpoints.only('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.only('sm')]: {
            width: '61%'
        },
        [theme.breakpoints.only('md')]: {
            width: '100%'
        },
        width: '61%'
    }
});

class TitleCard extends React.Component {
    state = {};

    render() {
        const { classes, children, title } = this.props;

        return (
            <Paper className={classes.paper} square={true} elevation={1}>
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