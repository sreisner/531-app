import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from '../../../../node_modules/@material-ui/core';
import Loading from '../../../core/loading/loading.component';
import CyclesService from '../../../services/api/cycles/cycles.service';
import SessionMetaGridContainer from '../core/sessionMetaGrid.component';
import FormCardContainer from './formCard/formCard.component';

class CycleCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: undefined,
      loading: false,
      error: undefined,
    };
  }

  calculateCycle = queryParamStr => {
    this.setState({ loading: true });
    CyclesService.generateCycle(queryParamStr)
      .then(cycle =>
        this.setState({
          cycle,
          error: undefined,
        })
      )
      .catch(error =>
        this.setState({
          cycle: undefined,
          error,
        })
      )
      .finally(() => this.setState({ loading: false }));
  };

  componentDidMount() {
    if (this.props.location.search) {
      this.calculateCycle(this.props.location.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.calculateCycle(nextProps.location.search);
    }
  }

  render() {
    const { cycle, loading, error } = this.state;

    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={40}>
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <FormCardContainer />
          </Grid>
          <Grid item xs={12} md={8} lg={9} xl={10}>
            {loading && <Loading />}
            {cycle && (
              <SessionMetaGridContainer
                sessionMeta={this.state.cycle.sessionMeta}
              />
            )}
            {error && <h1>An error occurred</h1>}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(CycleCalculator);
