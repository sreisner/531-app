import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import Link from 'react-router-dom/Link';
import { AuthConsumer } from '../../../context/authContext.component';

export default props => {
  const { showIfNotLoggedIn, to, icon, text } = props;

  return (
    <AuthConsumer>
      {({ user }) => {
        if ((user && !showIfNotLoggedIn) || showIfNotLoggedIn) {
          return (
            <Link to={to}>
              <ListItem button>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        }
      }}
    </AuthConsumer>
  );
};
