import React, { Component } from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './login/login.component';

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh'
    }
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { classes } = this.props;

        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <Route path="/login" component={Login} />
                </div>
            </BrowserRouter>
        );
    }
}

export default withRoot(withStyles(styles)(App));
