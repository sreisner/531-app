import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AuthContext } from '../../context/authContext.context';
import { Button, IconButton } from 'material-ui';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = theme => ({});

let UserAccountButton = props => {
  const { onAccountUserButtonClick, onLoginClick } = props;

  return (
    <AuthContext.Consumer>
      {({ isLoggedIn }) =>
        isLoggedIn ? (
          <IconButton color="inherit" onClick={onAccountUserButtonClick}>
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <Button color="inherit" onClick={onLoginClick}>
            Log In
          </Button>
        )
      }
    </AuthContext.Consumer>
  );
};

UserAccountButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

UserAccountButton = withStyles(styles)(UserAccountButton);
export { UserAccountButton };
