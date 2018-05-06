import React from 'react';
import { Route } from "react-router-dom";

export const LoginRoute = ({ onSuccess, user, component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={props =>
            <Component onSuccess={onSuccess} user={user} {...props} />
        }
    />
);