import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem } from '@material-ui/core';
import { AuthConsumer } from '../../context/authContext.context';

const styles = theme => ({});

class LoggedInUserMenu extends React.Component {
  handleLogout = onLogout => {
    onLogout().then(() => {
      this.props.onClose();
      this.props.history.push('/');
    });
  };

  render() {
    const { anchorElement, open, onClose } = this.props;

    return (
      <AuthConsumer>
        {({ onLogout }) => (
          <Menu
            id="menu-appbar"
            anchorEl={anchorElement}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={onClose}
          >
            <MenuItem onClick={() => this.handleLogout(onLogout)}>
              Log Out
            </MenuItem>
          </Menu>
        )}
      </AuthConsumer>
    );
  }
}

LoggedInUserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

LoggedInUserMenu = withRouter(withStyles(styles)(LoggedInUserMenu));
export { LoggedInUserMenu };
