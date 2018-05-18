import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import Link from 'react-router-dom/Link';
import { LoginModal } from '../loginModal/loginModal.component';
import { UserAccountButton } from './userAccountButton.component';

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
      drawerIsOpen: false,
      loginModalIsOpen: false,
    };
  }

  onLoginClick = () => {
    this.setState({ loginModalIsOpen: true });
  };

  closeLoginModal = () => {
    this.setState({ loginModalIsOpen: false });
  };

  toggleDrawer = () => {
    this.setState(prevState => ({ drawerIsOpen: !prevState.drawerIsOpen }));
  };

  render() {
    const { classes, title } = this.props;
    const { drawerIsOpen, loginModalIsOpen } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {title}
            </Typography>
            <UserAccountButton onLoginClick={this.onLoginClick} />
            <Drawer
              open={drawerIsOpen}
              onClose={this.toggleDrawer}
              anchor="left"
            >
              <List onClick={this.toggleDrawer} onKeyDown={this.toggleDrawer}>
                <Link to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
          </Toolbar>
        </AppBar>
        <LoginModal open={loginModalIsOpen} onClose={this.closeLoginModal} />
      </div>
    );
  }
}

AppBar531.propTypes = {
  classes: PropTypes.object.isRequired,
};

AppBar531 = withStyles(styles)(AppBar531);
export { AppBar531 };
