import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui';
import Link from 'react-router-dom/Link';
import { Button } from 'material-ui';
import { LoginModal } from '../loginModal/loginModal.component';

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

  onAccountUserButtonClick = () => {
    console.log('onAccountUserButtonClick click');
  };

  onLoginClick = () => {
    this.setState({ loginModalIsOpen: true });
  };

  closeLoginModal = () => {
    this.setState({ loginModalIsOpen: false });
  };

  onLoginSuccess = user => {
    this.closeLoginModal();
  };

  toggleDrawer = () => {
    this.setState(prevState => ({ drawerIsOpen: !prevState.drawerIsOpen }));
  };

  render() {
    const { classes, title, isLoggedIn } = this.props;
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
            {isLoggedIn ? (
              <IconButton
                color="inherit"
                onClick={this.onAccountUserButtonClick}
              />
            ) : (
              <Button color="inherit" onClick={this.onLoginClick}>
                Log In
              </Button>
            )}
            <Drawer
              open={drawerIsOpen}
              onClose={this.toggleDrawer}
              anchor="left"
            >
              <List onClick={this.toggleDrawer} onKeyDown={this.toggleDrawer}>
                <Link to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
          </Toolbar>
        </AppBar>
        <LoginModal
          open={loginModalIsOpen}
          onClose={this.closeLoginModal}
          onSuccess={this.onLoginSuccess}
        />
      </div>
    );
  }
}

AppBar531.propTypes = {
  classes: PropTypes.object.isRequired,
};

AppBar531 = withStyles(styles)(AppBar531);
export { AppBar531 };
