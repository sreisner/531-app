import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from '../../../core/loading/loading.component';
import UsersService from '../../../services/api/users/users.service';
import CurrentCycle from './currentCycle.component';

class CurrentCycleContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user && user.currentCycleId) {
      this.setState({ loading: true });

      UsersService.getCurrentCycle().then(currentCycle => {
        this.setState({ loading: false, currentCycle });
      });
    }
  }

  getStarted = () => {
    this.props.history.push('/cycle/generator/form');
  };

  render() {
    const { user } = this.props;
    const { currentCycle, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        {user ? (
          <div>
            {currentCycle ? (
              <CurrentCycle cycle={currentCycle} />
            ) : (
              <div>
                <Typography variant="title" color="inherit" gutterBottom={true}>
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
    );
  }
}

export default withRouter(CurrentCycleContainer);
