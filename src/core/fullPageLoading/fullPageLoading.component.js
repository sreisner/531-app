import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Typography, CircularProgress } from 'material-ui';

const styles = theme => ({
    root: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        background: theme.palette.secondary.main,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
});

class FullPageLoading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="display3" color="inherit">
                    Loading...
                </Typography>
                <CircularProgress className={classes.progress} />
            </div>
        );
    }
}

FullPageLoading.propTypes = {
    classes: PropTypes.object.isRequired
};

FullPageLoading = withStyles(styles)(FullPageLoading);
export { FullPageLoading };