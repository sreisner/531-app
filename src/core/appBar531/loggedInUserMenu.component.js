import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem } from '@material-ui/core';
import { AuthConsumer } from '../../context/authContext.component';

const styles = theme => ({
  menu: {
    minWidth: 200,
  },
});

class LoggedInUserMenu extends React.Component {
  handleLogout = logout => {
    logout().then(() => this.props.history.push('/'));
  };

  render() {
    const { anchorElement, open, onClose, classes } = this.props;

    return (
      <AuthConsumer>
        {({ logout }) => (
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
            <MenuItem
              onClick={() => this.handleLogout(logout)}
              className={classes.menu}
            >
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
