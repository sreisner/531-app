import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { AuthConsumer } from '../../../context/authContext.component';
import CurrentCycle from './currentCycle.component';

class CurrentCycleContainer extends React.Component {
  getStarted = () => {
    this.props.history.push('/cycle/generator/form');
  };

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <div>
            {user ? (
              <div>
                {user.currentCycle.length > 0 ? (
                  <CurrentCycle cycle={user.currentCycle} />
                ) : (
                  <div>
                    <Typography
                      variant="title"
                      color="inherit"
                      gutterBottom={true}
                    >
                      You haven't started a cycle yet.
                    </Typography>
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={this.getStarted}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Typography variant="title" color="inherit" gutterBottom={true}>
                  You must be logged in to keep track of your current cycle.
                </Typography>
              </div>
            )}
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default CurrentCycleContainer;
