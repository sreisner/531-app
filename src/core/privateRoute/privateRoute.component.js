import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            return !!user ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            );
        }}
    />
);