import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthConsumer } from '../../context/authContext.component';
import { LoginModalConsumer } from '../loginModal/loginModalContext.component';
import SignUpModal from '../signUpModal/signUpModal.component';
import AppBarDrawer from './appBarDrawer/appBarDrawer.component';
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
      signUpModalIsOpen: false,
      feedbackModalIsOpen: false,
    };
  }

  onSignUpClick = () => {
    this.setState({ signUpModalIsOpen: true });
  };

  closeSignUpModal = () => {
    this.setState({ signUpModalIsOpen: false });
  };

  toggleDrawer = () => {
    this.setState(prevState => ({ drawerIsOpen: !prevState.drawerIsOpen }));
  };

  render() {
    const { classes, title } = this.props;
    const { drawerIsOpen, signUpModalIsOpen } = this.state;

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
                  <Menu />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.flex}
                >
                  {title}
                </Typography>
                {!user && (
                  <span>
                    <Button color="inherit" onClick={this.onSignUpClick}>
                      Sign Up
                    </Button>

                    <LoginModalConsumer>
                      {({ openLoginModal }) => (
                        <Button color="inherit" onClick={openLoginModal}>
                          Login
                        </Button>
                      )}
                    </LoginModalConsumer>
                  </span>
                )}
                {user && <UserAccountButton />}
              </Toolbar>
            </AppBar>
          )}
        </AuthConsumer>

        <AppBarDrawer
          drawerIsOpen={drawerIsOpen}
          toggleDrawer={this.toggleDrawer}
        />
        <SignUpModal open={signUpModalIsOpen} onClose={this.closeSignUpModal} />
      </div>
    );
  }
}

AppBar531.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar531);
