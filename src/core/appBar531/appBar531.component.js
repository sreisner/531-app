import {
  AppBar,
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
      </div>
    );
  }
}

AppBar531.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar531);
