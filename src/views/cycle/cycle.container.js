import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import UsersService from '../../services/api/users/users.service';
import CurrentCycleContainer from './current/currentCycle.container';
import CycleGeneratorContainer from './generator/cycleGenerator.container';

// const styles = theme => ({
//   fab: {
//     position: 'fixed',
//     bottom: theme.spacing.unit * 2,
//     right: theme.spacing.unit * 3,
//   },
// });

class CycleContainer extends React.Component {
  startCycle = () => {
    this.setState({
      loading: true,
    });

    UsersService.startCycle('current', this.state.cycle).then(() =>
      this.props.history.push('/cycle/current')
    );
  };

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          path={`${match.url}/generator`}
          component={CycleGeneratorContainer}
        />
        <Route
          path={`${match.url}/current`}
          component={CurrentCycleContainer}
        />
      </Switch>
      // <AuthConsumer>
      //   {({ user }) => {
      //     if (user.currentCycle.length > 0) {
      //       return (
      //         <div>
      //           <div className={classes.grid}>
      //             <SessionGrid cycle={user.currentCycle} />
      //           </div>
      //           {user && (
      //             <Tooltip title="Start Cycle" placement="left">
      //               <Button
      //                 variant="fab"
      //                 color="secondary"
      //                 className={classes.fab}
      //                 onClick={this.startCycle}
      //                 disabled={loading}
      //               >
      //                 <CheckIcon />
      //               </Button>
      //             </Tooltip>
      //           )}
      //         </div>
      //       );
      //     } else {
      //       return (
      //       );
      //     }
      //   }}
      // </AuthConsumer>
    );
  }
}

export default withRouter(CycleContainer);
