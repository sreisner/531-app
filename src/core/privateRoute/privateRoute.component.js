import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { LoginService } from "../../services/api/login/login.service";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            console.log(LoginService.user);
            return !!LoginService.user ? (
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