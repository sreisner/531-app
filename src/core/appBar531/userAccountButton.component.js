import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../context/authContext.context';
import { Button, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { LoggedInUserMenu } from './loggedInUserMenu.component';

const styles = theme => ({});

class UserAccountButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUserMenuIsOpen: false,
    };
  }

  closeLoggedInUserMenu = () => {
    this.setState({ loggedInUserMenuIsOpen: false });
  };

  openLoggedInUserMenu = event => {
    this.setState({
      loggedInUserMenuIsOpen: true,
      loggedInUserMenuAnchorElement: event.target,
    });
  };

  render() {
    const { onLoginClick } = this.props;

    return (
      <AuthContext.Consumer>
        {({ isLoggedIn }) =>
          isLoggedIn ? (
            <div>
              <IconButton color="inherit" onClick={this.openLoggedInUserMenu}>
                <AccountCircleIcon />
              </IconButton>
              <LoggedInUserMenu
                anchorElement={this.state.loggedInUserMenuAnchorElement}
                open={this.state.loggedInUserMenuIsOpen}
                onClose={this.closeLoggedInUserMenu}
              />
            </div>
          ) : (
            <Button color="inherit" onClick={onLoginClick}>
              Log In
            </Button>
          )
        }
      </AuthContext.Consumer>
    );
  }
}

UserAccountButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

UserAccountButton = withStyles(styles)(UserAccountButton);
export { UserAccountButton };
