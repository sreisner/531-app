import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AdjustIcon from '@material-ui/icons/Adjust';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from 'material-ui';
import Link from 'react-router-dom/Link';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class AppBar531 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerIsOpen: false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState(prevState => ({drawerIsOpen: !prevState.drawerIsOpen}));
    }

    render() {
        const { classes } = this.props;
        const { drawerIsOpen } = this.state;
        
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            5/3/1
                        </Typography>
                        <Drawer
                            open={drawerIsOpen}
                            onClose={this.toggleDrawer}
                            anchor="left"
                            >
                            <List>
                                <Link to="/">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                </Link>
                                <Link to="/calculate-lifts">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AdjustIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Calculate Lifts" />
                                    </ListItem>
                                </Link>
                            </List>
                        </Drawer>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

AppBar531.propTypes = {
    classes: PropTypes.object.isRequired,
};

AppBar531 = withStyles(styles)(AppBar531);
export { AppBar531 };