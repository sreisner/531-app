import React from 'react';
import { Route } from "react-router-dom";

export const LoginRoute = ({ onSuccess, component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={props =>
            <Component onSuccess={onSuccess} {...props} />
        }
    />
);