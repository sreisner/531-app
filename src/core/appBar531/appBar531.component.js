import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Drawer,
  List,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { LoginModal } from '../loginModal/loginModal.component';
import { UserAccountButton } from './userAccountButton.component';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import AppBarLink from './appBarLink.component';

const styles = {
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
                <AppBarLink
                  text="Current Cycle"
                  to="/cycle/current"
                  showIfNotLoggedIn={false}
                  icon={<DashboardIcon />}
                />
                <AppBarLink
                  text="Cycle Generator"
                  to="/cycle/generator"
                  showIfNotLoggedIn={true}
                  icon={<ViewWeekIcon />}
                />
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
