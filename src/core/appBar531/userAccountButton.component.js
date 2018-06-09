import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import React from 'react';
import LoggedInUserMenu from './loggedInUserMenu.component';

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
    return (
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
    );
  }
}

UserAccountButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAccountButton);
