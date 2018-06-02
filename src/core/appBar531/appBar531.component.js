import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthConsumer } from '../../context/authContext.component';
import LoginModal from '../loginModal/loginModal.component';
import SignUpModal from '../signUpModal/signUpModal.component';
import AppBarLink from './appBarLink.component';
import UserAccountButton from './userAccountButton.component';

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
      signUpModalIsOpen: false,
    };
  }

  onLoginClick = () => {
    this.setState({ loginModalIsOpen: true });
  };

  onSignUpClick = () => {
    this.setState({ signUpModalIsOpen: true });
  };

  closeLoginModal = () => {
    this.setState({ loginModalIsOpen: false });
  };

  closeSignUpModal = () => {
    this.setState({ signUpModalIsOpen: false });
  };

  toggleDrawer = () => {
    this.setState(prevState => ({ drawerIsOpen: !prevState.drawerIsOpen }));
  };

  render() {
    const { classes, title } = this.props;
    const { drawerIsOpen, loginModalIsOpen, signUpModalIsOpen } = this.state;

    return (
      <div className={classes.root}>
        <AuthConsumer>
          {({ user }) => (
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
                {!user && (
                  <Button color="inherit" onClick={this.onSignUpClick}>
                    Sign Up
                  </Button>
                )}
                <UserAccountButton onLoginClick={this.onLoginClick} />
                <Drawer
                  open={drawerIsOpen}
                  onClose={this.toggleDrawer}
                  anchor="left"
                >
                  <List
                    onClick={this.toggleDrawer}
                    onKeyDown={this.toggleDrawer}
                  >
                    {user &&
                      user.currentCycleId && (
                        <AppBarLink
                          icon={<DashboardIcon />}
                          text="Current Cycle"
                          to={`/cycle/${user && user.currentCycleId}`}
                          showIfNotLoggedIn={false}
                        />
                      )}
                    <Divider />
                    <AppBarLink
                      icon={<ViewWeekIcon />}
                      text="Cycle Generator"
                      to="/cycle/generator/form"
                      showIfNotLoggedIn={true}
                    />
                  </List>
                </Drawer>
              </Toolbar>
            </AppBar>
          )}
        </AuthConsumer>

        <LoginModal open={loginModalIsOpen} onClose={this.closeLoginModal} />
        <SignUpModal open={signUpModalIsOpen} onClose={this.closeSignUpModal} />
      </div>
    );
  }
}

AppBar531.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar531);
