import React from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/home/home.component';
import { Login } from './pages/login/login.component';
import { CalculateLifts } from './pages/calculateLifts/calculateLifts.component';
import { PrivateRoute } from './core/privateRoute/privateRoute.component';

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh'
    }
});

class App extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/calculate-lifts" component={CalculateLifts} />
                </div>
            </BrowserRouter>
        );
    }
}

export default withRoot(withStyles(styles)(App));
